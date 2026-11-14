import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, radius } from "../theme";

export default function ActionBar({ onMenuPress, onBookPress }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <Pressable onPress={onMenuPress} style={[styles.button, styles.outline]}>
        <Ionicons name="book-outline" size={22} color={colors.primary} />
        <Text style={[styles.label, { color: colors.primary }]}>Menu</Text>
      </Pressable>
      <Pressable onPress={onBookPress} style={[styles.button, styles.filled]}>
        <Ionicons name="calendar-outline" size={22} color={colors.white} />
        <Text style={[styles.label, { color: colors.white }]}>Book a table</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: colors.white,
  },
  button: {
    flex: 1,
    height: 58,
    borderRadius: radius.pill,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  outline: { borderWidth: 1.5, borderColor: colors.primary, backgroundColor: colors.white },
  filled: { backgroundColor: colors.primary },
  label: { fontSize: 18, fontWeight: "500" },
});
