import { View, Text, StyleSheet } from "react-native";
import { colors, radius } from "../theme";
import SearchBar from "./SearchBar";

const todayText = () =>
  new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  }) + " - Today";

export default function GreetingCard({ name, dateText = todayText(), searchProps }) {
  return (
    <View style={styles.card}>
      <Text style={styles.hello}>
        <Text style={{ color: colors.primary }}>Hello! </Text>
        {name} 👋
      </Text>
      <Text style={styles.date}>{dateText}</Text>
      <View style={styles.search}>
        <SearchBar {...searchProps} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 18,
    borderRadius: radius.lg,
    backgroundColor: colors.primaryTint,
  },
  hello: { fontSize: 32, fontWeight: "600", color: colors.text },
  date: { marginTop: 4, fontSize: 15, color: colors.muted },
  search: { marginTop: 18 },
});
