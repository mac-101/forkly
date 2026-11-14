import { useRef, useState } from "react";
import { View, Text, Image, ScrollView, FlatList, StyleSheet, useWindowDimensions } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {
  ScreenHeader,
  SectionHeader,
  MealCard,
  MenuTabs,
  MenuItemRow,
  ActionBar,
} from "../../../components";
import {
  getRestaurantById,
  getMenuTabs,
  getItemsByRestaurant,
  getItemsForTab,
  FAVOURITE_RESTAURANT_IDS,
} from "../../../data";
import { getImage } from "../../../images";
import { colors } from "../../../theme";

export default function RestaurantScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const restaurant = getRestaurantById(String(id));

  // menu tabs = "All" + every category (no Popular tab, popular has its own section)
  const tabs = restaurant
    ? [
      { id: "All", count: getItemsByRestaurant(restaurant.id).length },
      ...getMenuTabs(restaurant.id).filter((t) => t.id !== "Popular"),
    ]
    : [];

  const scrollRef = useRef(null);
  const [menuY, setMenuY] = useState(0);
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);
  const [isFavourite, setIsFavourite] = useState(FAVOURITE_RESTAURANT_IDS.includes(String(id)));

  if (!restaurant) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.notFound}>Restaurant not found.</Text>
      </SafeAreaView>
    );
  }

  const heroSource = getImage(restaurant.image);
  const popular = getItemsForTab(restaurant.id, "Popular");
  const menuItems =
    activeTab === "All"
      ? getItemsByRestaurant(restaurant.id)
      : getItemsForTab(restaurant.id, activeTab);
  const cardWidth = (width - 32 - 12) / 2;
  const openItem = (item) => router.push(`/restaurant/${restaurant.id}/menu/${item.id}`);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title={restaurant.name}
          onBack={() => router.back()}
          isFavourite={isFavourite}
          onToggleFavourite={() => setIsFavourite((v) => !v)}
        />

        {heroSource ? (
          <Image source={heroSource} style={styles.hero} resizeMode="cover" />
        ) : (
          <View style={[styles.hero, styles.heroPlaceholder]} />
        )}

        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={20} color={colors.text} />
          <Text style={styles.address} numberOfLines={1}>{restaurant.address}</Text>
          <Ionicons name="star" size={18} color={colors.star} />
          <Text style={styles.rating}>{restaurant.rating}</Text>
        </View>

        <Text style={styles.description}>{restaurant.description}</Text>

        <View style={styles.section}>
          <SectionHeader title="Top Meals of the week" />
        </View>

        <FlatList
          horizontal
          data={popular}
          keyExtractor={(m) => m.id}
          showsHorizontalScrollIndicator={false}
          style={styles.meals}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          renderItem={({ item }) => (
            <MealCard
              item={item}
              imageSource={getImage(item.image)}
              width={cardWidth}
              onPress={() => openItem(item)}
            />
          )}
        />

        {/* Menu section: the Menu button scrolls here */}
        <View onLayout={(e) => setMenuY(e.nativeEvent.layout.y)} style={styles.section}>
          <SectionHeader title="Menu" />
          <View style={{ marginTop: 8 }}>
            <MenuTabs tabs={tabs} activeId={activeTab} onChange={setActiveTab} />
          </View>
          <View style={styles.menuList}>
            {menuItems.map((item) => (
              <MenuItemRow
                key={item.id}
                item={item}
                imageSource={getImage(item.image)}
                onPress={() => openItem(item)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <ActionBar
        onMenuPress={() => scrollRef.current?.scrollTo({ y: menuY - 8, animated: true })}
        onBookPress={() => router.push(`/restaurant/${restaurant.id}/book`)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 130 },
  notFound: { padding: 16, fontSize: 18, color: colors.text },
  hero: { marginTop: 16, height: 200, borderRadius: 24, width: "100%" },
  heroPlaceholder: { backgroundColor: colors.primaryTint },
  infoRow: { marginTop: 16, flexDirection: "row", alignItems: "center", gap: 6 },
  address: { flex: 1, fontSize: 15, color: colors.muted },
  rating: { fontSize: 15, color: colors.text },
  description: { marginTop: 12, fontSize: 16, lineHeight: 24, color: colors.muted },
  section: { marginTop: 24 },
  meals: { marginTop: 14 },
  menuList: { marginTop: 16, gap: 18 },
});