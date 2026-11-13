// data.js
// Mock data for the food ordering app.
// Images are referenced by KEY (e.g. "pepperoni-pizza"). Map each key to a
// local asset in a separate images.js file:
//   export default { "pepperoni-pizza": require("./assets/images/pepperoni-pizza.png"), ... }

// ---------- App-wide constants ----------
export const CURRENCY = "$"; // change to "₦" etc. in one place

export const USER = {
  id: "u1",
  name: "Arafat",
  avatar: "avatar",
  location: "140 Roadway Ave.",
};

export const SIZES = [
  { id: "S", label: "S", extraPrice: 0 },
  { id: "M", label: "M", extraPrice: 2 },
  { id: "L", label: "L", extraPrice: 4 },
];

export const ADD_ONS = [
  { id: "cheese", name: "Cheese", price: 1.0, max: 3 },
  { id: "onion", name: "Onion", price: 0.5, max: 3 },
  { id: "bacon", name: "Bacon", price: 1.5, max: 3 },
  { id: "olives", name: "Olives", price: 0.75, max: 3 },
];

export const PAYMENT_METHODS = [
  { id: "cash", label: "Cash", icon: "cash" },
  { id: "card", label: "Card", icon: "card" },
];

export const DELIVERY_OPTIONS = [
  { id: "asap", label: "25-30 min (ASAP)" },
  { id: "scheduled", label: "Schedule for later" },
];

// ---------- Categories (home screen chips) ----------
export const CATEGORIES = [
  { id: "all", label: "All food", emoji: "🍽️" },
  { id: "pizza", label: "Pizza", emoji: "🍕" },
  { id: "burgers", label: "Burgers", emoji: "🍔" },
  { id: "pasta", label: "Pasta", emoji: "🍝" },
  { id: "salads", label: "Salads", emoji: "🥗" },
  { id: "asian", label: "Asian", emoji: "🥟" },
];

// ---------- Restaurants ----------
export const RESTAURANTS = [
  {
    id: "r1",
    name: "The Burger Hub",
    location: "Los Angeles",
    address: "88 Sunset Blvd, Los Angeles, CA",
    rating: 4.7,
    reviewCount: 230,
    isOpen: true,
    image: "burger-hub",
    categories: ["burgers"],
    tags: ["Fast Service", "Spicy Lovers", "Pet Friendly"],
    description:
      "Discover the best handcrafted gourmet burgers in town! We use 100% fresh ingredients to bring you the ultimate burger experience.",
    deliveryTime: "20-30 min",
    deliveryFee: 2.5,
  },
  {
    id: "r2",
    name: "Asian Kitchen",
    location: "Birmingham, AL",
    address: "123 Ocean Drive, Birmingham, AL",
    rating: 4.5,
    reviewCount: 78,
    isOpen: true,
    image: "asian-kitchen",
    categories: ["asian"],
    tags: ["Fresh Daily", "Family Style"],
    description:
      "Refined dining where timeless culinary traditions meet contemporary flair. A sophisticated menu crafted from the finest ingredients.",
    deliveryTime: "25-35 min",
    deliveryFee: 3.0,
  },
  {
    id: "r3",
    name: "Napoli Slice",
    location: "Miami Beach, FL",
    address: "140 Roadway Ave, Miami Beach, FL",
    rating: 4.9,
    reviewCount: 412,
    isOpen: true,
    image: "napoli-slice",
    categories: ["pizza", "pasta"],
    tags: ["Wood Fired", "Fast Service"],
    description:
      "Stone-baked pizzas and fresh pasta made daily with imported flour and ripe tomatoes.",
    deliveryTime: "25-30 min",
    deliveryFee: 2.5,
  },
  {
    id: "r4",
    name: "Green Bowl",
    location: "Miami Beach, FL",
    address: "52 Palm Street, Miami Beach, FL",
    rating: 4.6,
    reviewCount: 95,
    isOpen: false,
    image: "green-bowl",
    categories: ["salads"],
    tags: ["Healthy", "Vegan Options"],
    description:
      "Fresh salads, bowls and business lunch deals made from locally sourced produce.",
    deliveryTime: "15-25 min",
    deliveryFee: 2.0,
  },
];

// ---------- Menu items ----------
// category = the menu tab inside a restaurant page
// hasSizes = shows the S / M / L picker on the item screen
// addOnIds = which ADD_ONS are offered for the item
// popular = shows under the "Popular" tab
// oldPrice + isBusinessLunch = home screen "Business lunch" deals
export const MENU_ITEMS = [
  // The Burger Hub
  {
    id: "m1",
    restaurantId: "r1",
    name: "Classic Cheeseburger",
    subtitle: "4 Pieces",
    category: "Burgers",
    price: 9.99,
    rating: 4.8,
    image: "classic-cheeseburger",
    description: "Beef patty, cheddar, lettuce, tomato and house sauce.",
    hasSizes: false,
    addOnIds: ["cheese", "onion", "bacon"],
    popular: true,
  },
  {
    id: "m2",
    restaurantId: "r1",
    name: "BBQ Bacon Burger",
    subtitle: "3 Pieces",
    category: "Burgers",
    price: 11.49,
    rating: 4.7,
    image: "bbq-bacon-burger",
    description: "Smoky BBQ glaze, crispy bacon and caramelised onions.",
    hasSizes: false,
    addOnIds: ["cheese", "onion", "bacon"],
    popular: true,
  },
  {
    id: "m3",
    restaurantId: "r1",
    name: "Vegan Beyond Burger",
    subtitle: "2 Pieces",
    category: "Burgers",
    price: 10.59,
    rating: 4.5,
    image: "vegan-burger",
    description: "Plant-based patty with avocado and vegan mayo.",
    hasSizes: false,
    addOnIds: ["onion", "olives"],
    popular: false,
  },
  {
    id: "m4",
    restaurantId: "r1",
    name: "Crispy Fries",
    subtitle: "Large",
    category: "Sides",
    price: 3.5,
    rating: 4.6,
    image: "fries",
    description: "Golden fries with sea salt.",
    hasSizes: false,
    addOnIds: ["cheese"],
    popular: true,
  },

  // Asian Kitchen
  {
    id: "m5",
    restaurantId: "r2",
    name: "Steamed Pork Momo",
    subtitle: "8 Pieces",
    category: "Momo",
    price: 8.5,
    rating: 4.7,
    image: "pork-momo",
    description: "Hand-folded dumplings with spicy tomato dip.",
    hasSizes: false,
    addOnIds: ["onion"],
    popular: true,
  },
  {
    id: "m6",
    restaurantId: "r2",
    name: "Chicken Momo",
    subtitle: "8 Pieces",
    category: "Momo",
    price: 7.9,
    rating: 4.6,
    image: "chicken-momo",
    description: "Juicy chicken filling in thin steamed wrappers.",
    hasSizes: false,
    addOnIds: ["onion"],
    popular: true,
  },
  {
    id: "m7",
    restaurantId: "r2",
    name: "Miso Soup",
    subtitle: "Bowl",
    category: "Soup",
    price: 4.25,
    rating: 4.4,
    image: "miso-soup",
    description: "Tofu, seaweed and spring onion in warm miso broth.",
    hasSizes: false,
    addOnIds: ["onion"],
    popular: false,
  },

  // Napoli Slice
  {
    id: "m8",
    restaurantId: "r3",
    name: "Pepperoni with garlic",
    subtitle: "Pizza",
    category: "Pizza",
    price: 6.5,
    rating: 4.95,
    image: "pepperoni-pizza",
    description: "Spicy pepperoni, mozzarella, garlic and fresh herbs.",
    hasSizes: true,
    addOnIds: ["cheese", "onion", "bacon", "olives"],
    popular: true,
  },
  {
    id: "m9",
    restaurantId: "r3",
    name: "Tomato'n'Bacon",
    subtitle: "Pizza",
    category: "Pizza",
    price: 6.25,
    rating: 4.83,
    image: "tomato-bacon-pizza",
    description: "Cherry tomatoes, smoked bacon and mozzarella.",
    hasSizes: true,
    addOnIds: ["cheese", "onion", "bacon", "olives"],
    popular: true,
  },
  {
    id: "m10",
    restaurantId: "r3",
    name: "Pizza Margherita",
    subtitle: "Pizza",
    category: "Pizza",
    price: 9.0,
    rating: 4.8,
    image: "margherita-pizza",
    description: "Tomato sauce, cheese and fresh basil leaves.",
    hasSizes: true,
    addOnIds: ["cheese", "olives"],
    popular: false,
  },
  {
    id: "m11",
    restaurantId: "r3",
    name: "Spaghetti Pomodoro",
    subtitle: "Pasta",
    category: "Pasta",
    price: 8.25,
    rating: 4.6,
    image: "spaghetti",
    description: "Spaghetti in slow-cooked tomato and basil sauce.",
    hasSizes: false,
    addOnIds: ["cheese"],
    popular: false,
  },

  // Green Bowl
  {
    id: "m12",
    restaurantId: "r4",
    name: "Salmon and onion",
    subtitle: "Salad",
    category: "Salads",
    price: 4.5,
    oldPrice: 6.0,
    rating: 4.7,
    image: "salmon-salad",
    description: "Grilled salmon on mixed greens with red onion.",
    hasSizes: false,
    addOnIds: ["onion", "bacon"],
    popular: true,
    isBusinessLunch: true,
  },
  {
    id: "m13",
    restaurantId: "r4",
    name: "Green salad",
    subtitle: "Salad",
    category: "Salads",
    price: 5.5,
    rating: 4.5,
    image: "green-salad",
    description: "Crisp greens, cucumber, cherry tomato and lemon dressing.",
    hasSizes: false,
    addOnIds: ["onion", "olives"],
    popular: true,
    isBusinessLunch: false,
  },
];

// ---------- Favourites (item ids) ----------
export const FAVOURITE_ITEM_IDS = ["m8", "m9", "m1"];
export const FAVOURITE_RESTAURANT_IDS = ["r1"];

// ---------- Helpers ----------
export const formatPrice = (value) => `${CURRENCY}${value.toFixed(2)}`;

export const getRestaurantById = (id) => RESTAURANTS.find((r) => r.id === id);

export const getItemById = (id) => MENU_ITEMS.find((m) => m.id === id);

export const getItemsByRestaurant = (restaurantId) =>
  MENU_ITEMS.filter((m) => m.restaurantId === restaurantId);

// Menu tabs for a restaurant page: "Popular (n)", then each category with counts
export const getMenuTabs = (restaurantId) => {
  const items = getItemsByRestaurant(restaurantId);
  const tabs = [
    { id: "Popular", count: items.filter((i) => i.popular).length },
  ];
  [...new Set(items.map((i) => i.category))].forEach((category) =>
    tabs.push({
      id: category,
      count: items.filter((i) => i.category === category).length,
    })
  );
  return tabs;
};

export const getItemsForTab = (restaurantId, tabId) => {
  const items = getItemsByRestaurant(restaurantId);
  return tabId === "Popular" ? items.filter((i) => i.popular) : items.filter((i) => i.category === tabId);
};

export const getFavouriteItems = () =>
  FAVOURITE_ITEM_IDS.map(getItemById).filter(Boolean);

export const getBusinessLunchItems = () =>
  MENU_ITEMS.filter((m) => m.isBusinessLunch);

export const getRestaurantsByCategory = (categoryId) =>
  categoryId === "all"
    ? RESTAURANTS
    : RESTAURANTS.filter((r) => r.categories.includes(categoryId));

export const searchAll = (query) => {
  const q = query.trim().toLowerCase();
  if (!q) return { restaurants: [], items: [] };
  return {
    restaurants: RESTAURANTS.filter((r) => r.name.toLowerCase().includes(q)),
    items: MENU_ITEMS.filter((m) => m.name.toLowerCase().includes(q)),
  };
};

// Price of ONE unit of an item with a chosen size and add-ons.
// addOns = { cheese: 1, bacon: 2 }  (id -> quantity)
export const calcUnitPrice = (item, sizeId = "S", addOns = {}) => {
  const size = item.hasSizes ? SIZES.find((s) => s.id === sizeId) : null;
  const sizeExtra = size ? size.extraPrice : 0;
  const addOnsTotal = Object.entries(addOns).reduce((sum, [id, qty]) => {
    const addOn = ADD_ONS.find((a) => a.id === id);
    return sum + (addOn ? addOn.price * qty : 0);
  }, 0);
  return item.price + sizeExtra + addOnsTotal;
};
