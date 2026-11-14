import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius } from "../theme";

export default function RestaurantHero({ imageSource, tags = [], isOpen, onBack }) {
  return (
    <View style={styles.hero}>
      {imageSource ? (
        <Image source={imageSource} style={StyleSheet.absoluteFill} resizeMode="cover" />
      ) : (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.primaryTint }]} />
      )}

      <View style={styles.top}>
        <Pressable onPress={onBack} style={styles.back}>
          <Ionicons name="arrow-back" size={22} color={colors.white} />
        </Pressable>
        <View style={[styles.badge, !isOpen && styles.badgeClosed]}>
          <Text style={styles.badgeText}>{isOpen ? "Open Now" : "Closed"}</Text>
        </View>
      </View>

      <View style={styles.tags}>
        {tags.map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: 230,
    borderRadius: radius.lg,
    overflow: "hidden",
    justifyContent: "space-between",
    padding: 12,
  },
  top: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  back: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },
  badgeClosed: { backgroundColor: "rgba(0,0,0,0.6)" },
  badgeText: { color: colors.white, fontSize: 15, fontWeight: "500" },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tag: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: "rgba(0,0,0,0.35)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
  },
  tagText: { color: colors.white, fontSize: 13 },
});
