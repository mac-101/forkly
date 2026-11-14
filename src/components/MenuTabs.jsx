import { ScrollView, Pressable, Text, StyleSheet } from "react-native";
import { colors } from "../theme";

const pad = (n) => String(n).padStart(2, "0");

export default function MenuTabs({ tabs, activeId, onChange }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.wrap}
      contentContainerStyle={styles.row}
    >
      {tabs.map((tab) => {
        const active = tab.id === activeId;
        return (
          <Pressable
            key={tab.id}
            onPress={() => onChange(tab.id)}
            style={[styles.tab, active && styles.tabActive]}
          >
            <Text style={[styles.label, active && styles.labelActive]}>
              {tab.id} ({pad(tab.count)})
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { borderBottomWidth: 1, borderBottomColor: colors.border },
  row: { gap: 8 },
  tab: { paddingVertical: 12, paddingHorizontal: 14, marginBottom: -1, borderBottomWidth: 2, borderBottomColor: "transparent" },
  tabActive: { borderBottomColor: colors.primary },
  label: { fontSize: 15, color: colors.text },
  labelActive: { color: colors.primary, fontWeight: "500" },
});
