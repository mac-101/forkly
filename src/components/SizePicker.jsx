import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "../theme";

export default function SizePicker({ sizes, value, onChange }) {
  return (
    <View style={styles.row}>
      {sizes.map((size) => {
        const active = size.id === value;
        return (
          <Pressable
            key={size.id}
            onPress={() => onChange(size.id)}
            style={[styles.chip, active && styles.chipActive]}
          >
            <Text style={[styles.label, active && styles.labelActive]}>{size.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 12 },
  chip: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  chipActive: { backgroundColor: colors.primary },
  label: { fontSize: 17, fontWeight: "500", color: colors.text },
  labelActive: { color: colors.white },
});
