import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius } from "../theme";

export default function ReservationCard({ reservation, onCancel }) {
  const { restaurantName, date, time, guests } = reservation;
  return (
    <View style={styles.card}>
      <Text style={styles.name} numberOfLines={1}>{restaurantName}</Text>
      <View style={styles.meta}>
        <View style={styles.metaItem}>
          <Ionicons name="calendar-outline" size={16} color={colors.primary} />
          <Text style={styles.metaText}>{date}</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="time-outline" size={16} color={colors.primary} />
          <Text style={styles.metaText}>{time}</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="people-outline" size={16} color={colors.primary} />
          <Text style={styles.metaText}>{guests} {guests === 1 ? "guest" : "guests"}</Text>
        </View>
      </View>
      <Pressable onPress={onCancel} style={styles.cancel}>
        <Text style={styles.cancelText}>Cancel</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, borderRadius: radius.lg, backgroundColor: colors.surface, gap: 12 },
  name: { fontSize: 18, fontWeight: "600", color: colors.text },
  meta: { flexDirection: "row", flexWrap: "wrap", gap: 16 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  metaText: { fontSize: 14, color: colors.text },
  cancel: {
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  cancelText: { fontSize: 14, fontWeight: "500", color: colors.primary },
});
