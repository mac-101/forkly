import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";

export default function EmptyState({ icon = "receipt-outline", title, subtitle }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.circle}>
        <Ionicons name={icon} size={30} color={colors.primary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center", paddingVertical: 48, paddingHorizontal: 24 },
  circle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primaryTint,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { marginTop: 16, fontSize: 20, fontWeight: "600", color: colors.text },
  subtitle: { marginTop: 6, fontSize: 15, lineHeight: 22, textAlign: "center", color: colors.muted },
});
