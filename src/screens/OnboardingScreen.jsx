import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Animated,
  PanResponder,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Illustration from "../components/Illustration";
import { useStore } from "../store";
import { colors, radius } from "../theme";

const SLIDES = [
  {
    key: "discover",
    title: "Find food you'll love",
    text: "Browse restaurants near you and discover your next favourite meal.",
  },
  {
    key: "order",
    title: "Order in a few taps",
    text: "Pick your dish, choose a size, add your extras and place the order.",
  },
  {
    key: "reserve",
    title: "Planning to dine in?",
    text: "Let the restaurant know when you're coming, then just show up and enjoy.",
  },
];
const LAST = SLIDES.length - 1;

const ART = 240; // illustration size
const R = 300; // radius of the arc the slides travel on
const STEP = 0.5; // radians between neighbouring slides
const OFFSETS = [-2, -1, -0.5, 0, 0.5, 1, 2]; // sample points for the arc

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

export default function OnboardingScreen() {
  const router = useRouter();
  const setHasVisited = useStore((s) => s.setHasVisited);
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const width = Math.min(screenWidth, 480); // keeps it phone-sized on desktop web
  const wheelHeight = Math.min(330, Math.max(130, screenHeight - 440));
  const artSize = Math.min(ART, wheelHeight - 24);

  const progress = useRef(new Animated.Value(0)).current; // 0 .. LAST (continuous)
  const current = useRef(0);
  const base = useRef(0);
  const widthRef = useRef(width);
  widthRef.current = width;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = progress.addListener(({ value }) => {
      current.current = value;
      setIndex(Math.round(value));
    });
    return () => progress.removeListener(id);
  }, [progress]);

  const goTo = (i) =>
    Animated.spring(progress, {
      toValue: clamp(i, 0, LAST),
      useNativeDriver: false,
      bounciness: 6,
      speed: 12,
    }).start();

  const pan = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) =>
        Math.abs(g.dx) > 8 && Math.abs(g.dx) > Math.abs(g.dy),
      onPanResponderGrant: () => {
        progress.stopAnimation();
        base.current = current.current;
      },
      onPanResponderMove: (_, g) => {
        progress.setValue(clamp(base.current - g.dx / (widthRef.current * 0.6), 0, LAST));
      },
      onPanResponderRelease: (_, g) => {
        const target = Math.round(
          base.current - g.dx / (widthRef.current * 0.6) - g.vx * 0.4
        );
        goTo(target);
      },
      onPanResponderTerminate: () => goTo(Math.round(current.current)),
    })
  ).current;

  // How slide i moves along the arc as `progress` changes
  const slideStyle = (i) => {
    const inputRange = OFFSETS.map((d) => i + d);
    const map = (fn) =>
      progress.interpolate({
        inputRange,
        outputRange: OFFSETS.map(fn),
        extrapolate: "clamp",
      });
    return {
      opacity: map((d) => Math.max(0, 1 - 0.65 * Math.abs(d))),
      zIndex: map((d) => Math.round(10 - Math.abs(d) * 3)),
      transform: [
        { translateX: map((d) => R * Math.sin(d * STEP)) },
        { translateY: map((d) => R * (1 - Math.cos(d * STEP))) },
        { rotate: map((d) => `${(d * STEP).toFixed(4)}rad`) },
        { scale: map((d) => Math.max(0.45, 1 - 0.28 * Math.abs(d))) },
      ],
    };
  };

  const textStyle = (i) => ({
    opacity: progress.interpolate({
      inputRange: [i - 1, i - 0.5, i, i + 0.5, i + 1],
      outputRange: [0, 0, 1, 0, 0],
      extrapolate: "clamp",
    }),
    transform: [
      {
        translateY: progress.interpolate({
          inputRange: [i - 1, i, i + 1],
          outputRange: [24, 0, -24],
          extrapolate: "clamp",
        }),
      },
    ],
  });

  const finish = (route) => {
    setHasVisited();
    router.replace(route);
  };

  const isLast = index === LAST;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.container, { width }]}>
        <View style={styles.content} {...pan.panHandlers}>
          <View style={styles.top}>
            <View style={styles.brandRow}>
              <View style={styles.brandIcon}>
                <Ionicons name="restaurant" size={16} color={colors.white} />
              </View>
              <Text style={styles.brand}>Forkly</Text>
            </View>
            {!isLast && (
              <Pressable onPress={() => goTo(LAST)} hitSlop={12}>
                <Text style={styles.skip}>Skip</Text>
              </Pressable>
            )}
          </View>

          {/* illustrations travelling along an arc */}
          <View style={[styles.wheel, { height: wheelHeight }]}>
            {SLIDES.map((slide, i) => (
              <Animated.View
                key={slide.key}
                style={[
                  styles.slide,
                  { left: (width - artSize) / 2, width: artSize, height: artSize },
                  slideStyle(i),
                ]}
              >
                <Illustration name={slide.key} size={artSize} />
              </Animated.View>
            ))}
          </View>

          {/* texts cross-fade with the same progress value */}
          <View style={styles.texts}>
            {SLIDES.map((slide, i) => (
              <Animated.View
                key={slide.key}
                pointerEvents="none"
                style={[styles.textBlock, textStyle(i)]}
              >
                <Text style={styles.title}>{slide.title}</Text>
                <Text style={styles.body}>{slide.text}</Text>
              </Animated.View>
            ))}
          </View>

          <View style={styles.dots}>
            {SLIDES.map((slide, i) => (
              <View key={slide.key} style={[styles.dot, i === index && styles.dotActive]} />
            ))}
          </View>
        </View>

        <View style={styles.actions}>
          {isLast ? (
            <>
              <Pressable onPress={() => finish("/signup")} style={styles.primary}>
                <Text style={styles.primaryText}>Create account</Text>
              </Pressable>
              <Pressable onPress={() => finish("/login")} style={styles.secondary}>
                <Text style={styles.secondaryText}>Log in</Text>
              </Pressable>
            </>
          ) : (
            <Pressable onPress={() => goTo(index + 1)} style={styles.primary}>
              <Text style={styles.primaryText}>Next</Text>
              <Ionicons name="arrow-forward" size={20} color={colors.white} />
            </Pressable>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, alignSelf: "center", paddingHorizontal: 20 },
  content: { flex: 1 },
  top: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  brandIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  brand: { fontSize: 22, fontWeight: "700", color: colors.primary },
  skip: { fontSize: 16, color: colors.muted },
  wheel: { marginHorizontal: -20, overflow: "hidden" },
  slide: { position: "absolute", top: 12, width: ART, height: ART },
  texts: { height: 130 },
  textBlock: { position: "absolute", left: 0, right: 0, alignItems: "center" },
  title: { fontSize: 28, fontWeight: "700", textAlign: "center", color: colors.text },
  body: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    color: colors.muted,
    paddingHorizontal: 8,
  },
  dots: { flexDirection: "row", justifyContent: "center", gap: 8, marginTop: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primaryTint },
  dotActive: { width: 26, backgroundColor: colors.primary },
  actions: { marginTop: "auto", paddingBottom: 12, gap: 12 },
  primary: {
    height: 58,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  primaryText: { fontSize: 18, fontWeight: "500", color: colors.white },
  secondary: {
    height: 58,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryText: { fontSize: 18, fontWeight: "500", color: colors.primary },
});
