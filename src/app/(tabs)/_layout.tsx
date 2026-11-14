import { Tabs } from "expo-router";
import { View } from "react-native";
import { BottomTabBar } from "../../components";
import { useCartCount } from "../../store";

// key must match the route file name inside (tabs)/
const TABS = [
  { key: "index", label: "Search", icon: "search-outline" },
  { key: "orders", label: "Orders", icon: "receipt-outline" },
  { key: "profile", label: "Profile", icon: "person-outline" },
  { key: "saved", label: "Saved", icon: "bookmark-outline" },
  { key: "menu", label: "Menu", icon: "menu-outline" },
];

export default function TabsLayout() {
  const cartCount = useCartCount();
  const tabs = TABS.map((t) => (t.key === "orders" ? { ...t, badge: cartCount } : t));

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={({ state, navigation }) => (
        <View style={{ position: "absolute", left: 16, right: 16, bottom: 24 }}>
          <BottomTabBar
            tabs={tabs}
            activeKey={state.routes[state.index].name}
            onChange={(key: string) => navigation.navigate(key)}
          />
        </View>
      )}
    >
      {TABS.map((t) => (
        <Tabs.Screen key={t.key} name={t.key} />
      ))}
    </Tabs>
  );
}
