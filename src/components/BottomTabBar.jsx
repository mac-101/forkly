import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius } from "../theme";

export const DEFAULT_TABS = [
  { key: "search", label: "Search", icon: "search-outline" },
  { key: "orders", label: "Orders", icon: "receipt-outline" },
  { key: "profile", label: "Profile", icon: "person-outline" },
  { key: "saved", label: "Saved", icon: "bookmark-outline" },
  { key: "menu", label: "Menu", icon: "menu-outline" },
];

// tab = { key, label, icon, badge? }
export default function BottomTabBar({ tabs = DEFAULT_TABS, activeKey, onChange }) {
  return (
    <View style={styles.bar}>
      {tabs.map((tab) => {
        const active = tab.key === activeKey;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onChange?.(tab.key)}
            style={[styles.tab, active && styles.tabActive]}
          >
            <View>
              <Ionicons
                name={tab.icon}
                size={22}
                color={active ? colors.white : colors.muted}
              />
              {tab.badge > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{tab.badge > 9 ? "9+" : tab.badge}</Text>
                </View>
              )}
            </View>
            {active && <Text style={styles.label}>{tab.label}</Text>}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tab: {
    height: 48,
    minWidth: 48,
    borderRadius: 24,
    backgroundColor: colors.surface,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  tabActive: { backgroundColor: colors.primary, paddingHorizontal: 18 },
  label: { color: colors.white, fontSize: 16, fontWeight: "500" },
  badge: {
    position: "absolute",
    top: -8,
    right: -10,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 9,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { color: colors.white, fontSize: 10, fontWeight: "700" },
});
