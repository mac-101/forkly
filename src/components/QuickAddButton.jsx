import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useStore } from "../store";
import { colors, radius } from "../theme";

export default function QuickAddButton({ item }) {
  const addToCart = useStore((state) => state.addToCart);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Add ${item.name} to cart`}
      onPress={() =>
        addToCart({ item, size: item.hasSizes ? "S" : null })
      }
      style={styles.button}
    >
      <Ionicons name="add" size={22} color={colors.white} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 38,
    height: 38,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
