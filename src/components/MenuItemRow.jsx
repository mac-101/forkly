import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { colors } from "../theme";
import { formatPrice } from "../data";
import QuickAddButton from "./QuickAddButton";

export default function MenuItemRow({ item, imageSource, onPress }) {
  return (
    <View style={styles.row}>
      <Pressable onPress={onPress} style={styles.item}>
        {imageSource ? (
          <Image source={imageSource} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={[styles.image, { backgroundColor: colors.primaryTint }]} />
        )}
        <View style={styles.texts}>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
      </Pressable>
      <QuickAddButton item={item} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  item: { flex: 1, flexDirection: "row", alignItems: "center", gap: 14 },
  image: { width: 68, height: 68, borderRadius: 16 },
  texts: { flex: 1 },
  name: { fontSize: 18, fontWeight: "500", color: colors.text },
  subtitle: { marginTop: 4, fontSize: 14, color: colors.muted },
  price: { fontSize: 18, fontWeight: "500", color: colors.text },
});
