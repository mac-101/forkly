// store.js
// ONE place for all app state + AsyncStorage persistence.
// Everything below is saved to AsyncStorage automatically and restored on launch.
//
// Usage anywhere:
//   import { useStore, getCartTotals, useCartCount } from "../store";
//   const addToCart = useStore((s) => s.addToCart);
//   const cart = useStore((s) => s.cart);

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER, calcUnitPrice, getRestaurantById } from "./data";

// AsyncStorage on web uses window.localStorage, which doesn't exist when Expo Router
// renders pages in Node (static/server output). In that case use a do-nothing storage.
const noopStorage = {
  getItem: async () => null,
  setItem: async () => {},
  removeItem: async () => {},
};
const safeStorage = () => (typeof window === "undefined" ? noopStorage : AsyncStorage);

const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

// Same item + same size + same add-ons = same cart line (quantity just goes up)
const lineKey = (itemId, size, addOns) =>
  `${itemId}|${size}|${Object.entries(addOns)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([id, q]) => `${id}:${q}`)
    .join(",")}`;

// Pure helper: subtotal, delivery fee (one per restaurant in the cart) and total
export const getCartTotals = (cart) => {
  const subtotal = cart.reduce((sum, l) => sum + l.unitPrice * l.qty, 0);
  const restaurantIds = [...new Set(cart.map((l) => l.restaurantId))];
  const deliveryFee = restaurantIds.reduce(
    (sum, id) => sum + (getRestaurantById(id)?.deliveryFee ?? 0),
    0
  );
  return { subtotal, deliveryFee, total: subtotal + deliveryFee };
};

export const useStore = create(
  persist(
    (set, get) => ({
      // ---------- state ----------
      hydrated: false, // true once AsyncStorage has been read (not saved)
      hasVisited: false, // onboarding shows only while this is false
      user: null, // { id, name, email } or null
      accounts: [], // local demo accounts
      cart: [], // lines not paid for yet
      orders: [], // placed orders
      reservations: [], // table bookings

      // ---------- onboarding ----------
      setHasVisited: () => set({ hasVisited: true }),

      // ---------- auth (local demo, no server) ----------
      // NOTE: passwords are NOT stored or checked. Replace with real auth (e.g. Supabase) later.
      signUp: ({ name, email }) => {
        const clean = email.trim().toLowerCase();
        if (get().accounts.some((a) => a.email === clean)) {
          return { ok: false, error: "An account with this email already exists." };
        }
        const account = { id: uid(), name: name.trim(), email: clean };
        set((s) => ({ accounts: [...s.accounts, account], user: account, hasVisited: true }));
        return { ok: true };
      },
      login: ({ email }) => {
        const account = get().accounts.find((a) => a.email === email.trim().toLowerCase());
        if (!account) return { ok: false, error: "No account found for this email." };
        set({ user: account, hasVisited: true });
        return { ok: true };
      },
      logout: () => set({ user: null }),

      // ---------- cart ----------
      // addToCart({ item, size, addOns: { cheese: 1 }, qty })
      addToCart: ({ item, size = null, addOns = {}, qty = 1 }) =>
        set((s) => {
          const cleanAddOns = Object.fromEntries(
            Object.entries(addOns).filter(([, q]) => q > 0)
          );
          const sizeId = item.hasSizes ? size : null;
          const key = lineKey(item.id, sizeId, cleanAddOns);

          if (s.cart.some((l) => l.key === key)) {
            return {
              cart: s.cart.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l)),
            };
          }
          return {
            cart: [
              ...s.cart,
              {
                key,
                itemId: item.id,
                name: item.name,
                image: item.image,
                restaurantId: item.restaurantId,
                restaurantName: getRestaurantById(item.restaurantId)?.name ?? "",
                size: sizeId,
                addOns: cleanAddOns,
                qty,
                unitPrice: calcUnitPrice(item, sizeId ?? "S", cleanAddOns),
              },
            ],
          };
        }),
      // Edit an existing cart line (opened from the cart): swaps its size/add-ons/qty.
      // If the new options match another line, the two merge.
      updateCartLine: (oldKey, { item, size = null, addOns = {}, qty = 1 }) =>
        set((s) => {
          const idx = s.cart.findIndex((l) => l.key === oldKey);
          if (idx === -1) return s;
          const cleanAddOns = Object.fromEntries(
            Object.entries(addOns).filter(([, q]) => q > 0)
          );
          const sizeId = item.hasSizes ? size : null;
          const newKey = lineKey(item.id, sizeId, cleanAddOns);
          const updated = {
            ...s.cart[idx],
            key: newKey,
            size: sizeId,
            addOns: cleanAddOns,
            qty,
            unitPrice: calcUnitPrice(item, sizeId ?? "S", cleanAddOns),
          };
          const rest = s.cart.filter((l) => l.key !== oldKey);
          const dup = rest.findIndex((l) => l.key === newKey);
          if (dup >= 0) {
            return { cart: rest.map((l, i) => (i === dup ? { ...l, qty: l.qty + qty } : l)) };
          }
          rest.splice(idx, 0, updated);
          return { cart: rest };
        }),
      setCartQty: (key, qty) =>
        set((s) => ({
          cart:
            qty <= 0
              ? s.cart.filter((l) => l.key !== key)
              : s.cart.map((l) => (l.key === key ? { ...l, qty } : l)),
        })),
      removeFromCart: (key) => set((s) => ({ cart: s.cart.filter((l) => l.key !== key) })),
      clearCart: () => set({ cart: [] }),

      // ---------- orders ----------
      // Turns the current cart into an order and empties the cart. Returns the order.
      placeOrder: ({ address = USER.location, paymentMethod = "cash", delivery = "asap" } = {}) => {
        const { cart } = get();
        if (cart.length === 0) return null;
        const order = {
          id: uid(),
          items: cart,
          ...getCartTotals(cart),
          address,
          paymentMethod,
          delivery,
          status: "preparing",
          createdAt: new Date().toISOString(),
        };
        set((s) => ({ orders: [order, ...s.orders], cart: [] }));
        return order;
      },

      // ---------- reservations ----------
      // We don't hold a specific table, this only tells the restaurant when you're coming.
      addReservation: ({ restaurantId, date, time, guests, note = "" }) => {
        const reservation = {
          id: uid(),
          restaurantId,
          restaurantName: getRestaurantById(restaurantId)?.name ?? "",
          date,
          time,
          guests,
          note,
          createdAt: new Date().toISOString(),
        };
        set((s) => ({ reservations: [reservation, ...s.reservations] }));
        return reservation;
      },
      cancelReservation: (id) =>
        set((s) => ({ reservations: s.reservations.filter((r) => r.id !== id) })),
    }),
    {
      name: "forkly-storage",
      storage: createJSONStorage(safeStorage),
      partialize: (s) => ({
        hasVisited: s.hasVisited,
        user: s.user,
        accounts: s.accounts,
        cart: s.cart,
        orders: s.orders,
        reservations: s.reservations,
      }),
      onRehydrateStorage: () => () => {
        useStore.setState({ hydrated: true });
      },
    }
  )
);

// Total number of items in the cart (for the tab badge)
export const useCartCount = () =>
  useStore((s) => s.cart.reduce((n, l) => n + l.qty, 0));