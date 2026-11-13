import { View, Text, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { getRestaurantById } from "../../data";
import { colors } from "../../theme";

// Stub: the real restaurant page comes next
export default function RestaurantScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const restaurant = getRestaurantById(String(id));

  return (
    <SafeAreaView style={styles.safe}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}>← Back</Text>
      </Pressable>
      <Text style={styles.title}>{restaurant ? restaurant.name : "Not found"}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, padding: 16, backgroundColor: colors.background },
  back: { fontSize: 16, color: colors.primary },
  title: { marginTop: 16, fontSize: 28, fontWeight: "600", color: colors.text },
});
