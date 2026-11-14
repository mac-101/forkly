// Resolves an image value from data.js into something <Image source={...} /> accepts.
// - "https://..." URLs (Unsplash) become { uri }
// - other keys are looked up in the local map below (add require(...) lines when you have local assets)
const localImages = {
  // "avatar": require("../assets/images/avatar.jpg"),
};

export const getImage = (value) => {
  if (!value) return null;
  if (typeof value === "string" && value.startsWith("http")) return { uri: value };
  return localImages[value] ?? null;
};