import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";
import { formatPrice } from "../data";
import QuickAddButton from "./QuickAddButton";

export default function MealCard({ item, imageSource, width, onPress }) {
  return (
    <View style={[styles.card, { width }]}>
      <Pressable onPress={onPress}>
        {imageSource ? (
          <Image source={imageSource} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={[styles.image, styles.placeholder]} />
        )}
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
      </Pressable>
      <View style={styles.footer}>
        <View style={styles.time}>
          <Ionicons name="time-outline" size={16} color={colors.primary} />
          <Text style={styles.timeText}>{item.prepTime} min</Text>
        </View>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <QuickAddButton item={item} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 10, borderRadius: 20, backgroundColor: colors.surface },
  image: { height: 100, borderRadius: 14, width: "100%" },
  placeholder: { backgroundColor: colors.primaryTint },
  name: { marginTop: 10, fontSize: 18, fontWeight: "600", color: colors.text },
  desc: { marginTop: 4, fontSize: 12, lineHeight: 16, color: colors.muted, minHeight: 32 },
  footer: { marginTop: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  time: { flexDirection: "row", alignItems: "center", gap: 4 },
  timeText: { fontSize: 13, color: colors.muted },
  price: { fontSize: 18, fontWeight: "600", color: colors.text },
});
