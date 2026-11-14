import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius } from "../theme";

export default function ReservationNotice() {
  return (
    <View style={styles.notice}>
      <Ionicons name="information-circle-outline" size={22} color={colors.primary} />
      <Text style={styles.text}>
        Please note that we don't hold a specific table for you as your reservation simply alerts the restaurant of your arrival. We'll send you a reminder before it's time.
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  notice: {
    flexDirection: "row",
    gap: 10,
    padding: 14,
    borderRadius: radius.md,
    backgroundColor: colors.primaryTint,
  },
  text: { flex: 1, fontSize: 14, lineHeight: 21, color: colors.text },
});
