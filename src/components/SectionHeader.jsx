import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "../theme";

export default function SectionHeader({ title, actionLabel = "View all", onActionPress }) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {onActionPress && (
        <Pressable onPress={onActionPress}>
          <Text style={styles.action}>{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  title: { fontSize: 20, fontWeight: "600", color: colors.text },
  action: { fontSize: 15, color: colors.muted },
});
