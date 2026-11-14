import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { colors } from "../theme";
import { ADD_ONS, formatPrice } from "../data";
import { getImage } from "../images";
import Stepper from "./Stepper";

// "Size M · Cheese ×2 · Bacon"
export const describeLine = (line) => {
  const parts = [];
  if (line.size) parts.push(`Size ${line.size}`);
  Object.entries(line.addOns ?? {}).forEach(([id, q]) => {
    const addOn = ADD_ONS.find((a) => a.id === id);
    if (addOn) parts.push(q > 1 ? `${addOn.name} ×${q}` : addOn.name);
  });
  return parts.join(" · ");
};

export default function CartLine({ line, onQtyChange, onPress }) {
  const source = getImage(line.image);
  const details = describeLine(line);

  return (
    <View style={styles.row}>
      <Pressable onPress={onPress} style={styles.left}>
        {source ? (
          <Image source={source} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={[styles.image, { backgroundColor: colors.primaryTint }]} />
        )}
        <View style={styles.texts}>
          <Text style={styles.name} numberOfLines={1}>{line.name}</Text>
          {details ? <Text style={styles.details} numberOfLines={2}>{details}</Text> : null}
          <Text style={styles.restaurant} numberOfLines={1}>{line.restaurantName}</Text>
        </View>
      </Pressable>
      <View style={styles.right}>
        <Text style={styles.price}>{formatPrice(line.unitPrice * line.qty)}</Text>
        <Stepper value={line.qty} onChange={onQtyChange} min={0} max={20} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  image: { width: 64, height: 64, borderRadius: 16 },
  left: { flex: 1, flexDirection: "row", alignItems: "center", gap: 12 },
  texts: { flex: 1 },
  name: { fontSize: 17, fontWeight: "500", color: colors.text },
  details: { marginTop: 2, fontSize: 12, color: colors.muted },
  restaurant: { marginTop: 2, fontSize: 12, color: colors.primary },
  right: { alignItems: "flex-end", gap: 8 },
  price: { fontSize: 16, fontWeight: "600", color: colors.text },
});