import { useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useStore } from "../store";
import { colors, radius } from "../theme";

const initials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

export default function ProfileScreen() {
  const router = useRouter();
  const user = useStore((s) => s.user);
  const orders = useStore((s) => s.orders);
  const reservations = useStore((s) => s.reservations);
  const cart = useStore((s) => s.cart);
  const logout = useStore((s) => s.logout);
  const [confirming, setConfirming] = useState(false);

  const cartCount = cart.reduce((n, l) => n + l.qty, 0);

  const stats = [
    { label: "Orders", value: orders.length },
    { label: "Reservations", value: reservations.length },
    { label: "In cart", value: cartCount },
  ];

  const rows = [
    { icon: "receipt-outline", label: "My orders", segment: "orders" },
    { icon: "calendar-outline", label: "My reservations", segment: "reservation" },
    { icon: "cart-outline", label: "My cart", segment: "cart" },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Profile</Text>

        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.initials}>{initials(user?.name) || "?"}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.name} numberOfLines={1}>{user?.name ?? "Guest"}</Text>
            <Text style={styles.email} numberOfLines={1}>{user?.email ?? ""}</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          {stats.map((s) => (
            <View key={s.label} style={styles.stat}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.list}>
          {rows.map((r) => (
            <Pressable
              key={r.segment}
              style={styles.row}
              onPress={() =>
                router.navigate({ pathname: "/orders", params: { segment: r.segment } })
              }
            >
              <View style={styles.rowIcon}>
                <Ionicons name={r.icon} size={20} color={colors.primary} />
              </View>
              <Text style={styles.rowLabel}>{r.label}</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.muted} />
            </Pressable>
          ))}
        </View>

        {confirming ? (
          <View style={styles.confirmCard}>
            <Text style={styles.confirmTitle}>Log out of Forkly?</Text>
            <Text style={styles.confirmText}>
              Your cart, orders and reservations stay saved on this device.
            </Text>
            <View style={styles.confirmButtons}>
              <Pressable onPress={() => setConfirming(false)} style={[styles.btn, styles.btnGhost]}>
                <Text style={styles.btnGhostText}>Cancel</Text>
              </Pressable>
              <Pressable onPress={logout} style={[styles.btn, styles.btnPrimary]}>
                <Text style={styles.btnPrimaryText}>Log out</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <Pressable onPress={() => setConfirming(true)} style={styles.logout}>
            <Ionicons name="log-out-outline" size={22} color={colors.primary} />
            <Text style={styles.logoutText}>Log out</Text>
          </Pressable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 130, gap: 20 },
  title: { fontSize: 30, fontWeight: "600", color: colors.text },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    borderRadius: radius.lg,
    backgroundColor: colors.primaryTint,
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  initials: { fontSize: 26, fontWeight: "700", color: colors.white },
  name: { fontSize: 22, fontWeight: "600", color: colors.text },
  email: { marginTop: 2, fontSize: 14, color: colors.muted },
  statsRow: { flexDirection: "row", gap: 12 },
  stat: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    alignItems: "center",
  },
  statValue: { fontSize: 22, fontWeight: "700", color: colors.text },
  statLabel: { marginTop: 2, fontSize: 12, color: colors.muted },
  list: { borderRadius: radius.lg, backgroundColor: colors.surface, overflow: "hidden" },
  row: { flexDirection: "row", alignItems: "center", gap: 12, padding: 14 },
  rowIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primaryTint,
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: { flex: 1, fontSize: 16, color: colors.text },
  logout: {
    height: 58,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  logoutText: { fontSize: 18, fontWeight: "500", color: colors.primary },
  confirmCard: { padding: 16, borderRadius: radius.lg, backgroundColor: colors.surface, gap: 8 },
  confirmTitle: { fontSize: 18, fontWeight: "600", color: colors.text },
  confirmText: { fontSize: 14, lineHeight: 21, color: colors.muted },
  confirmButtons: { flexDirection: "row", gap: 12, marginTop: 8 },
  btn: { flex: 1, height: 50, borderRadius: radius.pill, alignItems: "center", justifyContent: "center" },
  btnGhost: { backgroundColor: colors.white },
  btnGhostText: { fontSize: 16, fontWeight: "500", color: colors.text },
  btnPrimary: { backgroundColor: colors.primary },
  btnPrimaryText: { fontSize: 16, fontWeight: "500", color: colors.white },
});
