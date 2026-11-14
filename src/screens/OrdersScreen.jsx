import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  SegmentedControl,
  EmptyState,
  CartLine,
  OrderCard,
  ReservationCard,
  ReservationNotice,
} from "../components";
import { useStore, getCartTotals } from "../store";
import { USER, PAYMENT_METHODS, DELIVERY_OPTIONS, formatPrice } from "../data";
import { colors, radius } from "../theme";

const SEGMENTS = ["cart", "orders", "reservation"];

export default function OrdersScreen() {
  const [segment, setSegment] = useState("cart");
  const [payment, setPayment] = useState("cash");
  const pagerRef = useRef(null);
  const { width } = useWindowDimensions();
  const router = useRouter();
  const params = useLocalSearchParams();
  // e.g. after booking a table: navigate to /orders?segment=reservation
  useEffect(() => {
    const target = String(params.segment ?? "");
    if (SEGMENTS.includes(target)) setSegment(target);
  }, [params.segment]);

  useEffect(() => {
    const index = SEGMENTS.indexOf(segment);
    if (index >= 0) {
      pagerRef.current?.scrollTo({ x: index * width, animated: true });
    }
  }, [segment, width]);

  const cart = useStore((s) => s.cart);
  const orders = useStore((s) => s.orders);
  const reservations = useStore((s) => s.reservations);
  const setCartQty = useStore((s) => s.setCartQty);
  const placeOrder = useStore((s) => s.placeOrder);
  const cancelReservation = useStore((s) => s.cancelReservation);

  const totals = getCartTotals(cart);
  const cartCount = cart.reduce((n, l) => n + l.qty, 0);

  const options = [
    { id: "cart", label: "Cart", count: cartCount },
    { id: "orders", label: "Orders", count: orders.length },
    { id: "reservation", label: "Reservation", count: reservations.length },
  ];

  const handlePlaceOrder = () => {
    const order = placeOrder({ paymentMethod: payment });
    if (order) setSegment("orders");
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>My Orders</Text>
        <View style={styles.segmentControl}>
          <SegmentedControl options={options} value={segment} onChange={setSegment} />
        </View>
      </View>

      <ScrollView
        ref={pagerRef}
        style={styles.pager}
        horizontal
        pagingEnabled
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setSegment(SEGMENTS[index] ?? "cart");
        }}
      >
        <View style={{ width }}>
          <ScrollView
            style={styles.page}
            contentContainerStyle={styles.pageContent}
            showsVerticalScrollIndicator={false}
          >
            {cart.length === 0 ? (
              <EmptyState
                icon="cart-outline"
                title="Your cart is empty"
                subtitle="Food you add but haven't paid for yet shows up here."
              />
            ) : (
              <View style={styles.block}>
                <View style={styles.lines}>
                  {cart.map((line) => (
                    <CartLine
                      key={line.key}
                      line={line}
                      onQtyChange={(qty) => setCartQty(line.key, qty)}
                      onPress={() =>
                        router.push({
                          pathname: "/restaurant/[id]/menu/[itemId]",
                          params: {
                            id: line.restaurantId,
                            itemId: line.itemId,
                            lineKey: line.key,
                          },
                        })
                      }
                    />
                  ))}
                </View>

                <View style={styles.card}>
                  <View style={styles.infoRow}>
                    <Ionicons name="location-outline" size={20} color={colors.primary} />
                    <Text style={styles.infoText}>{USER.location}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Ionicons name="time-outline" size={20} color={colors.primary} />
                    <Text style={styles.infoText}>{DELIVERY_OPTIONS[0].label}</Text>
                  </View>
                  <View style={styles.payRow}>
                    {PAYMENT_METHODS.map((m) => {
                      const active = m.id === payment;
                      return (
                        <Pressable
                          key={m.id}
                          onPress={() => setPayment(m.id)}
                          style={[styles.payChip, active && styles.payChipActive]}
                        >
                          <Ionicons
                            name={m.id === "card" ? "card-outline" : "cash-outline"}
                            size={18}
                            color={active ? colors.white : colors.muted}
                          />
                          <Text style={[styles.payText, active && styles.payTextActive]}>
                            {m.label}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>

                <View style={styles.summary}>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Subtotal</Text>
                    <Text style={styles.summaryValue}>{formatPrice(totals.subtotal)}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Delivery fee</Text>
                    <Text style={styles.summaryValue}>{formatPrice(totals.deliveryFee)}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>{formatPrice(totals.total)}</Text>
                  </View>
                </View>

                <Pressable onPress={handlePlaceOrder} style={styles.placeButton}>
                  <Text style={styles.placeText}>Place order</Text>
                </Pressable>
              </View>
            )}
          </ScrollView>
        </View>

        <View style={{ width }}>
          <ScrollView
            style={styles.page}
            contentContainerStyle={styles.pageContent}
            showsVerticalScrollIndicator={false}
          >
            {orders.length === 0 ? (
              <EmptyState
                icon="receipt-outline"
                title="No orders yet"
                subtitle="Once you place an order from your cart, it will show up here."
              />
            ) : (
              <View style={[styles.block, { gap: 16 }]}>
                {orders.map((o) => (
                  <OrderCard key={o.id} order={o} />
                ))}
              </View>
            )}
          </ScrollView>
        </View>

        <View style={{ width }}>
          <ScrollView
            style={styles.page}
            contentContainerStyle={styles.pageContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={[styles.block, { gap: 16 }]}>
              <ReservationNotice />

              {reservations.length === 0 ? (
                <EmptyState
                  icon="calendar-outline"
                  title="No reservations"
                  subtitle={'Use "Book a table" on a restaurant page to let them know you\'re coming.'}
                />
              ) : (
                reservations.map((r) => (
                  <ReservationCard
                    key={r.id}
                    reservation={r}
                    onCancel={() => cancelReservation(r.id)}
                  />
                ))
              )}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: 16, paddingTop: 8 },
  segmentControl: { marginTop: 16 },
  pager: { flex: 1 },
  page: { flex: 1 },
  pageContent: { flexGrow: 1, paddingHorizontal: 16, paddingTop: 20, paddingBottom: 130 },
  title: { fontSize: 30, fontWeight: "600", color: colors.text },
  block: { marginTop: 20, gap: 20 },
  lines: { gap: 18 },
  card: { padding: 16, borderRadius: radius.lg, backgroundColor: colors.surface, gap: 14 },
  infoRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  infoText: { flex: 1, fontSize: 15, color: colors.text },
  payRow: { flexDirection: "row", gap: 10 },
  payChip: {
    flex: 1,
    height: 46,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  payChipActive: { backgroundColor: colors.primary },
  payText: { fontSize: 15, fontWeight: "500", color: colors.muted },
  payTextActive: { color: colors.white },
  summary: { gap: 8 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  summaryLabel: { fontSize: 15, color: colors.muted },
  summaryValue: { fontSize: 15, color: colors.muted },
  totalLabel: { fontSize: 20, fontWeight: "600", color: colors.text },
  totalValue: { fontSize: 20, fontWeight: "700", color: colors.text },
  placeButton: {
    height: 58,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  placeText: { fontSize: 18, fontWeight: "500", color: colors.white },
  notice: {
    flexDirection: "row",
    gap: 10,
    padding: 14,
    borderRadius: radius.md,
    backgroundColor: colors.primaryTint,
  },
  noticeText: { flex: 1, fontSize: 14, lineHeight: 21, color: colors.text },
});