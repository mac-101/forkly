import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius } from "../theme";

export default function SearchBar({
  value,
  onChangeText,
  onFilterPress,
  placeholder = "Search your place here",
}) {
  return (
    <View style={styles.container}>
      <View style={styles.searchIcon}>
        <Ionicons name="search-outline" size={20} color={colors.text} />
      </View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        style={styles.input}
      />
      <Pressable onPress={onFilterPress} style={styles.filter}>
        <Ionicons name="options-outline" size={20} color={colors.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
  },
  searchIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  input: { flex: 1, fontSize: 16, color: colors.text },
  filter: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
});
