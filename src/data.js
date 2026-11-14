// data.js
// Mock data for the food ordering app.
// Images are Unsplash URLs built with unsplash("<photo id>").
// To swap one: open a photo on unsplash.com, copy the "photo-xxxx" part of its image URL.

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

// ---------- Image helper ----------
const unsplash = (photoId, w = 600) =>
  `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=${w}&q=75`;

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
    image: unsplash("1568901346375-23c9450c58cd", 900),
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
    image: unsplash("1569718212165-3a8278d5f624", 900),
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
    image: unsplash("1513104890138-7c749659a591", 900),
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
    image: unsplash("1512621776951-a57141f2eefd", 900),
    categories: ["salads"],
    tags: ["Healthy", "Vegan Options"],
    description:
      "Fresh salads, bowls and business lunch deals made from locally sourced produce.",
    deliveryTime: "15-25 min",
    deliveryFee: 2.0,
  },
];

// ---------- Menu items ----------
// mk(id, restaurantId, name, subtitle, category, price, prepMinutes, photoId, description, options)
// options: { sizes, addOns: [ids], popular, rating, oldPrice, lunch }
// category = the menu tab inside a restaurant page
const mk = (id, restaurantId, name, subtitle, category, price, prepTime, photoId, description, o = {}) => ({
  id,
  restaurantId,
  name,
  subtitle,
  category,
  price,
  prepTime,
  rating: o.rating ?? 4.6,
  image: unsplash(photoId),
  description,
  hasSizes: !!o.sizes,
  addOnIds: o.addOns ?? [],
  popular: !!o.popular,
  ...(o.oldPrice ? { oldPrice: o.oldPrice } : {}),
  isBusinessLunch: !!o.lunch,
});

const BURGER_ADDONS = ["cheese", "onion", "bacon"];
const PIZZA_ADDONS = ["cheese", "onion", "bacon", "olives"];

export const MENU_ITEMS = [
  // ----- The Burger Hub (r1) -----
  mk("m1", "r1", "Classic Cheeseburger", "4 Pieces", "Burgers", 9.99, 12, "1568901346375-23c9450c58cd", "Beef patty, cheddar, lettuce, tomato and house sauce.", { addOns: BURGER_ADDONS, popular: true, rating: 4.8 }),
  mk("m2", "r1", "BBQ Bacon Burger", "3 Pieces", "Burgers", 11.49, 15, "1550547660-d9450f859349", "Smoky BBQ glaze, crispy bacon and caramelised onions.", { addOns: BURGER_ADDONS, popular: true, rating: 4.7 }),
  mk("m3", "r1", "Vegan Beyond Burger", "2 Pieces", "Burgers", 10.59, 12, "1571091718767-18b5b1457add", "Plant-based patty with avocado and vegan mayo.", { addOns: ["onion", "olives"], rating: 4.5 }),
  mk("m4", "r1", "Double Smash Burger", "2 Pieces", "Burgers", 12.99, 15, "1551782450-a2132b4ba21d", "Two smashed patties, double cheese and pickles.", { addOns: BURGER_ADDONS, popular: true, rating: 4.9 }),
  mk("m5", "r1", "Crispy Chicken Burger", "3 Pieces", "Chicken", 10.25, 14, "1606755962773-d324e0a13086", "Buttermilk fried chicken with slaw and spicy mayo.", { addOns: BURGER_ADDONS }),
  mk("m6", "r1", "Spicy Chicken Wings", "8 Pieces", "Chicken", 8.99, 14, "1608039829572-78524f79c4c7", "Tossed in hot sauce, served with ranch dip.", { rating: 4.7 }),
  mk("m7", "r1", "Crispy Fries", "Large", "Sides", 3.5, 6, "1573080496219-bb080dd4f877", "Golden fries with sea salt.", { addOns: ["cheese"], popular: true }),
  mk("m8", "r1", "Onion Rings", "10 Pieces", "Sides", 4.25, 8, "1639024471283-03518883512d", "Thick-cut rings in a crunchy beer batter.", { addOns: ["cheese"] }),
  mk("m9", "r1", "Classic Milkshake", "Vanilla", "Drinks", 5.5, 5, "1572490122747-3968b75cc699", "Thick vanilla shake topped with whipped cream."),
  mk("m10", "r1", "Fresh Lemonade", "500 ml", "Drinks", 3.75, 3, "1621263764928-df1444c5e859", "Freshly squeezed lemons with mint."),

  // ----- Asian Kitchen (r2) -----
  mk("m11", "r2", "Steamed Pork Momo", "8 Pieces", "Momo", 8.5, 10, "1496116218417-1a781b1c416c", "Hand-folded dumplings with spicy tomato dip.", { addOns: ["onion"], popular: true, rating: 4.7 }),
  mk("m12", "r2", "Chicken Momo", "8 Pieces", "Momo", 7.9, 10, "1534422298391-e4f8c172dddb", "Juicy chicken filling in thin steamed wrappers.", { addOns: ["onion"], popular: true }),
  mk("m13", "r2", "Veg Momo", "8 Pieces", "Momo", 7.25, 10, "1563245372-f21724e3856d", "Cabbage, carrot and tofu filling.", { addOns: ["onion"], rating: 4.4 }),
  mk("m14", "r2", "Miso Soup", "Bowl", "Soup", 4.25, 5, "1547592166-23ac45744acd", "Tofu, seaweed and spring onion in warm miso broth.", { rating: 4.4 }),
  mk("m15", "r2", "Tom Yum Soup", "Bowl", "Soup", 6.75, 8, "1548943487-a2e4e43b4859", "Hot and sour broth with prawns and lemongrass.", { rating: 4.6 }),
  mk("m16", "r2", "Pork Ramen", "Bowl", "Noodles", 11.5, 15, "1569718212165-3a8278d5f624", "Rich pork broth, chashu, egg and spring onion.", { popular: true, rating: 4.8 }),
  mk("m17", "r2", "Pad Thai", "Plate", "Noodles", 10.75, 14, "1559314809-0d155014e29e", "Rice noodles, peanuts, lime and bean sprouts.", { rating: 4.6 }),
  mk("m18", "r2", "Chicken Fried Rice", "Plate", "Mains", 9.25, 12, "1603133872878-684f208fb84b", "Wok-fried rice with chicken, egg and vegetables.", { rating: 4.5 }),
  mk("m19", "r2", "Salmon Teriyaki", "Plate", "Mains", 14.5, 18, "1485921325833-c519f76c4927", "Grilled salmon glazed in teriyaki, with steamed rice.", { popular: true, rating: 4.8 }),
  mk("m20", "r2", "Sushi Platter", "12 Pieces", "Mains", 16.99, 20, "1579871494447-9811cf80d66c", "Chef's selection of nigiri and maki rolls.", { rating: 4.9 }),

  // ----- Napoli Slice (r3) -----
  mk("m21", "r3", "Pepperoni with garlic", "Pizza", "Pizza", 6.5, 17, "1513104890138-7c749659a591", "Spicy pepperoni, mozzarella, garlic and fresh herbs.", { sizes: true, addOns: PIZZA_ADDONS, popular: true, rating: 4.95 }),
  mk("m22", "r3", "Tomato'n'Bacon", "Pizza", "Pizza", 6.25, 15, "1565299624946-b28f40a0ae38", "Cherry tomatoes, smoked bacon and mozzarella.", { sizes: true, addOns: PIZZA_ADDONS, popular: true, rating: 4.83 }),
  mk("m23", "r3", "Pizza Margherita", "Pizza", "Pizza", 9.0, 10, "1574071318508-1cdbab80d002", "Tomato sauce, cheese and fresh basil leaves.", { sizes: true, addOns: ["cheese", "olives"], popular: true, rating: 4.8 }),
  mk("m24", "r3", "Four Cheese Pizza", "Pizza", "Pizza", 10.5, 14, "1573821663912-569905455b1c", "Mozzarella, gorgonzola, parmesan and fontina.", { sizes: true, addOns: PIZZA_ADDONS, rating: 4.7 }),
  mk("m25", "r3", "BBQ Chicken Pizza", "Pizza", "Pizza", 11.25, 16, "1594007654729-407eedc4be65", "Grilled chicken, red onion and smoky BBQ sauce.", { sizes: true, addOns: PIZZA_ADDONS, popular: true, rating: 4.7 }),
  mk("m26", "r3", "Spaghetti Pomodoro", "Pasta", "Pasta", 8.25, 12, "1621996346565-e3dbc646d9a9", "Spaghetti in slow-cooked tomato and basil sauce.", { addOns: ["cheese"] }),
  mk("m27", "r3", "Creamy Carbonara", "Pasta", "Pasta", 10.25, 14, "1612874742237-6526221588e3", "Egg, pecorino and crispy pancetta.", { addOns: ["cheese", "bacon"], rating: 4.7 }),
  mk("m28", "r3", "Beef Lasagna", "Pasta", "Pasta", 11.75, 20, "1574894709920-11b28e7367e3", "Layers of pasta, ragù and béchamel baked golden.", { addOns: ["cheese"], rating: 4.8 }),
  mk("m29", "r3", "Garlic Bread", "4 Slices", "Starters", 4.5, 6, "1573140401552-3fab0b24306f", "Toasted ciabatta with garlic butter and parsley.", { addOns: ["cheese"] }),
  mk("m30", "r3", "Tiramisu", "Slice", "Desserts", 6.25, 5, "1571877227200-a0d98ea607e9", "Espresso-soaked sponge with mascarpone cream.", { rating: 4.9 }),

  // ----- Green Bowl (r4) -----
  mk("m31", "r4", "Salmon and onion", "Salad", "Salads", 4.5, 8, "1467003909585-2f8a72700288", "Grilled salmon on mixed greens with red onion.", { addOns: ["onion", "bacon"], popular: true, oldPrice: 6.0, lunch: true, rating: 4.7 }),
  mk("m32", "r4", "Green salad", "Salad", "Salads", 5.5, 5, "1512621776951-a57141f2eefd", "Crisp greens, cucumber, cherry tomato and lemon dressing.", { addOns: ["onion", "olives"], popular: true, lunch: true, rating: 4.5 }),
  mk("m33", "r4", "Caesar Salad", "Salad", "Salads", 6.75, 7, "1550304943-4f24f54ddde9", "Romaine, parmesan, croutons and Caesar dressing.", { addOns: ["bacon", "cheese"] }),
  mk("m34", "r4", "Greek Salad", "Salad", "Salads", 6.25, 6, "1540189549336-e6e99c3679fe", "Tomato, cucumber, feta and olives with oregano.", { addOns: ["olives", "onion"] }),
  mk("m35", "r4", "Quinoa Power Bowl", "Bowl", "Bowls", 8.99, 10, "1546069901-ba9599a7e63c", "Quinoa, roasted veg, chickpeas and tahini.", { popular: true, rating: 4.8 }),
  mk("m36", "r4", "Chicken Avocado Bowl", "Bowl", "Bowls", 9.75, 12, "1490645935967-10de6ba17061", "Grilled chicken, avocado, rice and greens.", { rating: 4.7 }),
  mk("m37", "r4", "Falafel Wrap", "Wrap", "Wraps", 7.5, 8, "1626700051175-6818013e1d4f", "Crispy falafel, hummus and pickled veg.", { addOns: ["onion", "olives"] }),
  mk("m38", "r4", "Grilled Chicken Wrap", "Wrap", "Wraps", 7.99, 9, "1565299507177-b0ac66763828", "Grilled chicken, lettuce and garlic yoghurt.", { addOns: ["onion", "cheese"] }),
  mk("m39", "r4", "Green Detox Smoothie", "400 ml", "Smoothies", 5.25, 4, "1610970881699-44a5587cabec", "Spinach, apple, cucumber and ginger.", { popular: true }),
  mk("m40", "r4", "Berry Blast Smoothie", "400 ml", "Smoothies", 5.5, 4, "1553530666-ba11a7da3888", "Strawberry, blueberry and banana.", { rating: 4.7 }),
];

// ---------- Favourites ----------
export const FAVOURITE_ITEM_IDS = ["m21", "m22", "m1"];
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
  const tabs = [{ id: "Popular", count: items.filter((i) => i.popular).length }];
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
  return tabId === "Popular"
    ? items.filter((i) => i.popular)
    : items.filter((i) => i.category === tabId);
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