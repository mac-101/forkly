import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";

export default function Stepper({ value, onChange, min = 0, max = 99 }) {
  return (
    <View style={styles.row}>
      <Pressable
        onPress={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        style={[styles.button, value <= min && styles.disabled]}
      >
        <Ionicons name="remove" size={18} color={colors.text} />
      </Pressable>
      <Text style={styles.value}>{value}</Text>
      <Pressable
        onPress={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        style={[styles.button, value >= max && styles.disabled]}
      >
        <Ionicons name="add" size={18} color={colors.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  button: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: { opacity: 0.4 },
  value: { minWidth: 18, textAlign: "center", fontSize: 16, fontWeight: "500", color: colors.text },
});
