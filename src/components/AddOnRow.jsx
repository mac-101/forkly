import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors, radius } from "../theme";
import { formatPrice } from "../data";
import Stepper from "./Stepper";

export default function AddOnRow({ addOn, qty, onChange }) {
  return (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{addOn.name}</Text>
        <Text style={styles.price}>+{formatPrice(addOn.price)}</Text>
      </View>
      {qty === 0 ? (
        <Pressable onPress={() => onChange(1)} style={styles.addButton}>
          <Text style={styles.addText}>+ Add</Text>
        </Pressable>
      ) : (
        <Stepper value={qty} onChange={onChange} min={0} max={addOn.max} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 12, minHeight: 44 },
  name: { fontSize: 17, color: colors.text },
  price: { marginTop: 2, fontSize: 13, color: colors.muted },
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.primaryTint,
  },
  addText: { fontSize: 14, fontWeight: "500", color: colors.primary },
});
