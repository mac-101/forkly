import { View, Text, StyleSheet } from "react-native";
import { colors, radius } from "../theme";
import { formatPrice } from "../data";
import { describeLine } from "./CartLine";

const STATUS_LABEL = { preparing: "Preparing", delivered: "Delivered" };

export default function OrderCard({ order }) {
  const restaurants = [...new Set(order.items.map((i) => i.restaurantName))].join(", ");
  const date = new Date(order.createdAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.restaurants} numberOfLines={1}>{restaurants}</Text>
        <View style={styles.status}>
          <Text style={styles.statusText}>{STATUS_LABEL[order.status] ?? order.status}</Text>
        </View>
      </View>

      <View style={styles.items}>
        {order.items.map((line) => {
          const details = describeLine(line);
          return (
            <View key={line.key} style={styles.itemRow}>
              <Text style={styles.itemName} numberOfLines={2}>
                {line.qty}× {line.name}
                {details ? <Text style={styles.itemDetails}>{`  ${details}`}</Text> : null}
              </Text>
              <Text style={styles.itemPrice}>{formatPrice(line.unitPrice * line.qty)}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.footer}>
        <Text style={styles.date}>{date} · {order.paymentMethod === "card" ? "Card" : "Cash"}</Text>
        <Text style={styles.total}>{formatPrice(order.total)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, borderRadius: radius.lg, backgroundColor: colors.surface, gap: 12 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  restaurants: { flex: 1, fontSize: 18, fontWeight: "600", color: colors.text },
  status: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: radius.pill, backgroundColor: colors.primaryTint },
  statusText: { fontSize: 12, fontWeight: "600", color: colors.primary },
  items: { gap: 6 },
  itemRow: { flexDirection: "row", justifyContent: "space-between", gap: 12 },
  itemName: { flex: 1, fontSize: 15, color: colors.text },
  itemDetails: { fontSize: 12, color: colors.muted },
  itemPrice: { fontSize: 15, color: colors.text },
  footer: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  date: { fontSize: 13, color: colors.muted },
  total: { fontSize: 18, fontWeight: "700", color: colors.text },
});
