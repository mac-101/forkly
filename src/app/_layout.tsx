import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Stack, useRouter, useSegments } from "expo-router";
import { useStore } from "../store";

// Decides where the user belongs:
//  - never visited  -> onboarding
//  - visited, no account/login -> login (or signup)
//  - logged in -> the app
function Gate() {
  const router = useRouter();
  const segments = useSegments();
  const hydrated = useStore((s) => s.hydrated);
  const hasVisited = useStore((s) => s.hasVisited);
  const user = useStore((s) => s.user);
  const first = (segments[0] as string | undefined) ?? "";

  useEffect(() => {
    if (!hydrated) return;
    const onboarding = first === "onboarding";
    const authRoute = first === "login" || first === "signup";

    if (!hasVisited) {
      if (!onboarding) router.replace("/onboarding" as any);
    } else if (!user) {
      if (!authRoute && !onboarding) router.replace("/login" as any);
    } else if (authRoute || onboarding) {
      router.replace("/" as any);
    }
  }, [hydrated, hasVisited, user, first]);

  // cover the screen until AsyncStorage has been read
  if (hydrated) return null;
  return (
    <View style={styles.splash}>
      <Text style={styles.brand}>Forkly</Text>
    </View>
  );
}

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
      <Gate />
    </>
  );
}

const styles = StyleSheet.create({
  splash: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  brand: { fontSize: 32, fontWeight: "700", color: "#DC2626" },
});
