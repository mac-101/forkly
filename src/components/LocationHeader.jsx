import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius } from "../theme";

export default function LocationHeader({ address, avatar, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.iconWrap}>
        <Ionicons name="location-outline" size={22} color={colors.primary} />
      </View>
      <View style={styles.texts}>
        <Text style={styles.label}>Current Location</Text>
        <Text style={styles.address} numberOfLines={1}>{address}</Text>
      </View>
      {avatar ? (
        <Image source={avatar} style={styles.avatar} />
      ) : (
        <View style={[styles.avatar, styles.avatarFallback]}>
          <Ionicons name="person" size={22} color={colors.white} />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
  avatarFallback: {
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
