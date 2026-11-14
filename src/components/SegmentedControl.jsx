import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors, radius } from "../theme";

// options = [{ id, label, count? }]
export default function SegmentedControl({ options, value, onChange }) {
  return (
    <View style={styles.wrap}>
      {options.map((o) => {
        const active = o.id === value;
        return (
          <Pressable
            key={o.id}
            onPress={() => onChange(o.id)}
            style={[styles.item, active && styles.itemActive]}
          >
            <Text style={[styles.label, active && styles.labelActive]} numberOfLines={1}>
              {o.label}
            </Text>
            {o.count > 0 && (
              <View style={[styles.count, active && styles.countActive]}>
                <Text style={[styles.countText, active && styles.countTextActive]}>{o.count}</Text>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    padding: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
  },
  item: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  itemActive: { backgroundColor: colors.primary },
  label: { fontSize: 15, fontWeight: "500", color: colors.muted },
  labelActive: { color: colors.white },
  count: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: colors.primaryTint,
    alignItems: "center",
    justifyContent: "center",
  },
  countActive: { backgroundColor: colors.white },
  countText: { fontSize: 11, fontWeight: "700", color: colors.primary },
  countTextActive: { color: colors.primary },
});
