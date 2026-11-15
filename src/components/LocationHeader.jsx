import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius } from "../theme";

const initials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

export default function LocationHeader({ address, avatar, userName, onPress, onAvatarPress }) {
  return (
    <View>
      <Pressable onPress={onPress} style={styles.container}>
        <View style={styles.iconWrap}>
          <Ionicons name="location-outline" size={22} color={colors.primary} />
        </View>
        <View style={styles.texts}>
          <Text style={styles.label}>Current Location</Text>
          <Text style={styles.address} numberOfLines={1}>{address}</Text>
        </View>
        <Pressable onPress={onAvatarPress} hitSlop={6}>
          {avatar ? (
            <Image source={avatar} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarFallback]}>
              {initials(userName) ? (
                <Text style={styles.initials}>{initials(userName)}</Text>
              ) : (
                <Ionicons name="person" size={22} color={colors.white} />
              )}
            </View>
          )}
        </Pressable>
      </Pressable>
    </View>
  );
}

export function BrandHeader() {
  return (
    <View style={styles.brandRow}>
      <View style={styles.brandIcon}>
        <Ionicons name="restaurant" size={16} color={colors.white} />
      </View>
      <Text style={styles.brand}>Forkly</Text>
    </View>
  );
}

const styles = StyleSheet.create({
   brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.background,
    zIndex: 1,
    marginBottom: 12,
    padding: 10,
  },
  brandIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  brand: { fontSize: 22, fontWeight: "700", color: colors.primary },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    gap: 12,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryTint,
    alignItems: "center",
    justifyContent: "center",
  },
  texts: { flex: 1 },
  label: { fontSize: 13, color: colors.muted },
  address: { fontSize: 16, fontWeight: "500", color: colors.text },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  initials: { fontSize: 17, fontWeight: "700", color: colors.white },
  avatarFallback: {
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});