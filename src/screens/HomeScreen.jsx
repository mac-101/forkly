import { useMemo, useState } from "react";
import { View, Text, ScrollView, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  LocationHeader,
  GreetingCard,
  CategoryCard,
  SectionHeader,
  RestaurantCard,
} from "../components";
import { BrandHeader } from "../components";
import { colors } from "../theme";
import { useStore } from "../store";
import { getImage } from "../images";
import { USER, CATEGORIES, RESTAURANTS, getRestaurantsByCategory } from "../data";

export default function HomeScreen() {
  const router = useRouter();
  const user = useStore((s) => s.user);
  const firstName = user?.name?.trim().split(" ")[0] || USER.name;
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const restaurants = useMemo(() => {
    const q = query.trim().toLowerCase();
    return getRestaurantsByCategory(category).filter(
      (r) => !q || r.name.toLowerCase().includes(q)
    );
  }, [category, query]);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        stickyHeaderIndices={[0]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <BrandHeader />
        <LocationHeader
          address={USER.location}
          userName={user?.name}
          onAvatarPress={() => router.navigate("/profile")}
        />

        <View style={styles.block}>
          <GreetingCard
            name={firstName}
            searchProps={{
              value: query,
              onChangeText: setQuery,
              onFilterPress: () => {}, // TODO: filter sheet
            }}
          />
        </View>

        <FlatList
          horizontal
          data={CATEGORIES}
          keyExtractor={(c) => c.id}
          showsHorizontalScrollIndicator={false}
          style={styles.block}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          renderItem={({ item }) => (
            <CategoryCard
              label={item.label}
              emoji={item.emoji}
              selected={item.id === category}
              onPress={() => setCategory(item.id)}
            />
          )}
        />

        <View style={styles.block}>
          <SectionHeader title="Nearby Restaurants" onActionPress={() => setCategory("all")} />
        </View>

        <View style={styles.list}>
          {restaurants.length === 0 ? (
            <Text style={styles.empty}>No restaurants found.</Text>
          ) : (
            restaurants.map((r) => (
              <RestaurantCard
                key={r.id}
                restaurant={r}
                imageSource={getImage(r.image)}
                onPress={() => router.push(`/restaurant/${r.id}`)}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 110 },
  block: { marginTop: 20 },
  list: { marginTop: 14, gap: 16 },
  empty: { textAlign: "center", color: colors.muted, marginTop: 24 },
});