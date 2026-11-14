import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";

export default function ScreenHeader({ title, onBack, isFavourite, onToggleFavourite }) {
  return (
    <View style={styles.row}>
      <Pressable onPress={onBack} style={styles.button}>
        <Ionicons name="arrow-back" size={22} color={colors.text} />
      </Pressable>
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      <Pressable onPress={onToggleFavourite} style={styles.button}>
        <Ionicons
          name={isFavourite ? "heart" : "heart-outline"}
          size={22}
          color={isFavourite ? colors.primary : colors.text}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 },
  title: { flex: 1, textAlign: "center", fontSize: 20, fontWeight: "500", color: colors.text },
  button: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
});
