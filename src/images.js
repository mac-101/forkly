// Map the image keys used in data.js to local assets.
// Add a line per image once the file exists in assets/images.
const images = {
  "burger-hub": {
    uri: "https://images.unsplash.com/photo-1687580712324-ba65e882514a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  },
  // "asian-kitchen": require("../assets/images/asian-kitchen.jpg"),
};

export const getImage = (key) => images[key] ?? null;
