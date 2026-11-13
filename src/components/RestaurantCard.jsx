import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius } from "../theme";

export default function RestaurantCard({ restaurant, imageSource, onPress }) {
  const { name, location, rating, reviewCount, isOpen } = restaurant;

  return (
    <Pressable onPress={onPress} style={styles.card}>
      {imageSource ? (
        <Image source={imageSource} style={StyleSheet.absoluteFill} resizeMode="cover" />
      ) : (
        <View style={[StyleSheet.absoluteFill, styles.placeholder]} />
      )}

      <View style={[styles.badge, !isOpen && styles.badgeClosed]}>
        <Text style={styles.badgeText}>{isOpen ? "Open now" : "Closed"}</Text>
      </View>

      <View style={styles.panel}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <View style={styles.meta}>
            <Ionicons name="location-outline" size={16} color={colors.white} />
            <Text style={styles.metaText} numberOfLines={1}>{location}</Text>
            <Ionicons name="star" size={16} color={colors.star} />
            <Text style={styles.metaText} numberOfLines={1}>
              {rating} ratings ({reviewCount} reviews)
            </Text>
          </View>
        </View>
        <View style={styles.arrow}>
          <Ionicons
            name="arrow-up-outline"
            size={22}
            color={colors.text}
            style={{ transform: [{ rotate: "45deg" }] }}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 230,
    borderRadius: radius.lg,
    overflow: "hidden",
    justifyContent: "space-between",
  },
  placeholder: { backgroundColor: colors.primaryTint },
  badge: {
    alignSelf: "flex-end",
    margin: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },
  badgeClosed: { backgroundColor: "rgba(0,0,0,0.6)" },
  badgeText: { color: colors.white, fontSize: 15, fontWeight: "500" },
  panel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    margin: 8,
    padding: 12,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  name: { fontSize: 26, fontWeight: "600", color: colors.white },
  meta: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 },
  metaText: { fontSize: 13, color: colors.white, flexShrink: 1 },
  arrow: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});
