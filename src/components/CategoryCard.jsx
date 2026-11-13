import { Text, Pressable, StyleSheet } from "react-native";
import { colors, radius } from "../theme";

export default function CategoryCard({ label, emoji, selected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, selected && styles.cardSelected]}
    >
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={[styles.label, selected && styles.labelSelected]} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 88,
    height: 96,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  cardSelected: {
    backgroundColor: colors.primaryTint,
    borderColor: colors.primary,
  },
  emoji: { fontSize: 32 },
  label: { fontSize: 14, color: colors.text },
  labelSelected: { fontWeight: "500" },
});
