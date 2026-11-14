import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, radius } from "../theme";

export default function OrderOnlineButton({ label = "Order Online", onPress }) {
  const insets = useSafeAreaInsets();
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, { bottom: Math.max(insets.bottom, 12) + 8 }]}
    >
      <Text style={styles.label}>{label}</Text>
      <View style={styles.arrow}>
        <Ionicons
          name="arrow-up-outline"
          size={22}
          color={colors.text}
          style={{ transform: [{ rotate: "45deg" }] }}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    left: 16,
    right: 16,
    height: 64,
    paddingLeft: 24,
    paddingRight: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: { color: colors.white, fontSize: 18, fontWeight: "500" },
  arrow: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});
