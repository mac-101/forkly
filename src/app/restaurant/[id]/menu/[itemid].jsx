import { useState } from "react";
import { View, Text, Image, ScrollView, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { SizePicker, AddOnRow, Stepper, OrderOnlineButton } from "../../../../components";
import { getItemById, ADD_ONS, SIZES, calcUnitPrice, formatPrice } from "../../../../data";
import { getImage } from "../../../../images";
import { colors } from "../../../../theme";

export default function ItemScreen() {
  const { itemid: itemId } = useLocalSearchParams();
  const router = useRouter();
  const item = getItemById(String(itemId));

  const [size, setSize] = useState("S");
  const [qty, setQty] = useState(1);
  const [addOns, setAddOns] = useState({}); // { cheese: 1, bacon: 2 }

  if (!item) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.notFound}>Item not found.</Text>
      </SafeAreaView>
    );
  }

  const imageSource = getImage(item.image);
  const unitPrice = calcUnitPrice(item, size, addOns);
  const total = unitPrice * qty;
  const itemAddOns = ADD_ONS.filter((a) => item.addOnIds.includes(a.id));

  const setAddOnQty = (addOnId, value) =>
    setAddOns((prev) => ({ ...prev, [addOnId]: value }));

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          {imageSource ? (
            <Image source={imageSource} style={StyleSheet.absoluteFill} resizeMode="cover" />
          ) : (
            <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.primaryTint }]} />
          )}
          <Pressable onPress={() => router.back()} style={styles.back}>
            <Ionicons name="arrow-back" size={22} color={colors.white} />
          </Pressable>
        </View>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={16} color={colors.star} />
          <Text style={styles.rating}>{item.rating}</Text>
          <Ionicons name="time-outline" size={16} color={colors.primary} style={{ marginLeft: 10 }} />
          <Text style={styles.rating}>{item.prepTime} min</Text>
        </View>

        <View style={styles.titleRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
          <Text style={styles.price}>{formatPrice(unitPrice)}</Text>
        </View>

        <Text style={styles.description}>{item.description}</Text>

        {item.hasSizes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Size</Text>
            <SizePicker sizes={SIZES} value={size} onChange={setSize} />
          </View>
        )}

        {itemAddOns.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Add more stuff</Text>
            <View style={{ gap: 6 }}>
              {itemAddOns.map((a) => (
                <AddOnRow
                  key={a.id}
                  addOn={a}
                  qty={addOns[a.id] ?? 0}
                  onChange={(v) => setAddOnQty(a.id, v)}
                />
              ))}
            </View>
          </View>
        )}

        <View style={[styles.section, styles.qtyRow]}>
          <Text style={styles.sectionTitle}>Quantity</Text>
          <Stepper value={qty} onChange={setQty} min={1} max={20} />
        </View>
      </ScrollView>

      <OrderOnlineButton
        label={`Add to cart · ${formatPrice(total)}`}
        onPress={() => {
          // TODO: add { item, size, addOns, qty } to the cart store
          router.back();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 130 },
  notFound: { padding: 16, fontSize: 18, color: colors.text },
  hero: { height: 280, borderRadius: 28, overflow: "hidden", padding: 12 },
  back: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  ratingRow: { marginTop: 16, flexDirection: "row", alignItems: "center", gap: 4 },
  rating: { fontSize: 14, color: colors.muted },
  titleRow: { marginTop: 8, flexDirection: "row", alignItems: "flex-start", gap: 12 },
  name: { fontSize: 28, fontWeight: "600", color: colors.text },
  subtitle: { marginTop: 2, fontSize: 15, color: colors.muted },
  price: { fontSize: 24, fontWeight: "600", color: colors.primary },
  description: { marginTop: 12, fontSize: 15, lineHeight: 23, color: colors.muted },
  section: { marginTop: 24, gap: 12 },
  sectionTitle: { fontSize: 20, fontWeight: "600", color: colors.text },
  qtyRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
});