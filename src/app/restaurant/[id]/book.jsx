import { useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView, Pressable, TextInput, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { ScreenHeader, Stepper, ReservationNotice } from "../../../components";
import { getRestaurantById } from "../../../data";
import { useStore } from "../../../store";
import { colors, radius } from "../../../theme";

// 12:00 PM ... 9:30 PM, every 30 minutes
const SLOTS = Array.from({ length: 20 }, (_, i) => {
  const minutes = 12 * 60 + i * 30;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const hr12 = h > 12 ? h - 12 : h;
  return { minutes, label: `${hr12}:${m === 0 ? "00" : "30"} ${h >= 12 ? "PM" : "AM"}` };
});

const buildDates = () =>
  Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      id: i,
      top: i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString("en-US", { weekday: "short" }),
      sub: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      label: d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
    };
  });

export default function BookTableScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const addReservation = useStore((s) => s.addReservation);
  const restaurant = getRestaurantById(String(id));

  const dates = useMemo(buildDates, []);
  const [dateIdx, setDateIdx] = useState(0);
  const [time, setTime] = useState(null);
  const [guests, setGuests] = useState(2);
  const [note, setNote] = useState("");

  // today: hide time slots that have already passed (or start within 30 minutes)
  const slots = useMemo(() => {
    if (dateIdx !== 0) return SLOTS;
    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    return SLOTS.filter((s) => s.minutes > nowMinutes + 30);
  }, [dateIdx]);

  useEffect(() => {
    if (time && !slots.some((s) => s.label === time)) setTime(null);
  }, [slots, time]);

  if (!restaurant) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.notFound}>Restaurant not found.</Text>
      </SafeAreaView>
    );
  }

  const confirm = () => {
    if (!time) return;
    addReservation({
      restaurantId: restaurant.id,
      date: dates[dateIdx].label,
      time,
      guests,
      note: note.trim(),
    });
    router.navigate({ pathname: "/orders", params: { segment: "reservation" } });
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ScreenHeader title="Book a table" onBack={() => router.back()} />

        <Text style={styles.restaurant}>{restaurant.name}</Text>
        <Text style={styles.address}>{restaurant.address}</Text>

        <View style={styles.section}>
          <ReservationNotice />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
            {dates.map((d) => {
              const active = d.id === dateIdx;
              return (
                <Pressable
                  key={d.id}
                  onPress={() => setDateIdx(d.id)}
                  style={[styles.dateChip, active && styles.chipActive]}
                >
                  <Text style={[styles.dateTop, active && styles.chipTextActive]}>{d.top}</Text>
                  <Text style={[styles.dateSub, active && styles.chipTextActive]}>{d.sub}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Time</Text>
          {slots.length === 0 ? (
            <Text style={styles.muted}>No more time slots today. Pick another date.</Text>
          ) : (
            <View style={styles.timeGrid}>
              {slots.map((s) => {
                const active = s.label === time;
                return (
                  <Pressable
                    key={s.label}
                    onPress={() => setTime(s.label)}
                    style={[styles.timeChip, active && styles.chipActive]}
                  >
                    <Text style={[styles.timeText, active && styles.chipTextActive]}>{s.label}</Text>
                  </Pressable>
                );
              })}
            </View>
          )}
        </View>

        <View style={[styles.section, styles.guestRow]}>
          <Text style={styles.sectionTitle}>Guests</Text>
          <Stepper value={guests} onChange={setGuests} min={1} max={12} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Note (optional)</Text>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="Anything the restaurant should know?"
            placeholderTextColor={colors.muted}
            multiline
            style={styles.input}
          />
        </View>
      </ScrollView>

      <View style={[styles.bottom, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <Pressable
          onPress={confirm}
          disabled={!time}
          style={[styles.confirm, !time && styles.confirmDisabled]}
        >
          <Text style={styles.confirmText}>
            {time ? `Confirm · ${dates[dateIdx].top}, ${time}` : "Pick a time to continue"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 130 },
  notFound: { padding: 16, fontSize: 18, color: colors.text },
  restaurant: { marginTop: 20, fontSize: 26, fontWeight: "600", color: colors.text },
  address: { marginTop: 4, fontSize: 14, color: colors.muted },
  section: { marginTop: 22, gap: 12 },
  sectionTitle: { fontSize: 18, fontWeight: "600", color: colors.text },
  muted: { fontSize: 14, color: colors.muted },
  dateChip: {
    minWidth: 78,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    alignItems: "center",
    gap: 2,
  },
  chipActive: { backgroundColor: colors.primary },
  chipTextActive: { color: colors.white },
  dateTop: { fontSize: 15, fontWeight: "600", color: colors.text },
  dateSub: { fontSize: 12, color: colors.muted },
  timeGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  timeChip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
  },
  timeText: { fontSize: 14, fontWeight: "500", color: colors.text },
  guestRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  input: {
    minHeight: 80,
    padding: 14,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    fontSize: 15,
    color: colors.text,
    textAlignVertical: "top",
  },
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: colors.white,
  },
  confirm: {
    height: 58,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmDisabled: { opacity: 0.45 },
  confirmText: { fontSize: 17, fontWeight: "500", color: colors.white },
});
