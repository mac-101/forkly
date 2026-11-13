import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme";

export default function PlaceholderScreen({ title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.sub}>Coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background },
  title: { fontSize: 28, fontWeight: "600", color: colors.text },
  sub: { marginTop: 6, fontSize: 16, color: colors.muted },
});
