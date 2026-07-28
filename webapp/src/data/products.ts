export type CategorySlug =
  | "fruits-vegetables"
  | "dairy-bakery"
  | "staples-grains"
  | "snacks"
  | "beverages"
  | "household"
  | "personal-care";

export type Category = {
  slug: CategorySlug;
  name: string;
  tagline: string;
  emoji: string;
  /** Tailwind gradient used for category tiles and image placeholders. */
  gradient: string;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  /** Optional strike-through price, used to show a saving. */
  mrp?: number;
  unit: string;
  /** Alternate pack sizes the shopper can pick on the product page. */
  variants?: { unit: string; price: number }[];
  category: CategorySlug;
  description: string;
  /** Replace with real product photography when available. */
  image: string;
  emoji: string;
  featured?: boolean;
  inStock: boolean;
};

export const categories: Category[] = [
  {
    slug: "fruits-vegetables",
    name: "Fruits & Vegetables",
    tagline: "Picked fresh every morning",
    emoji: "🥬",
    gradient: "from-emerald-100 via-lime-50 to-white",
  },
  {
    slug: "dairy-bakery",
    name: "Dairy & Bakery",
    tagline: "Milk, paneer, bread & more",
    emoji: "🥛",
    gradient: "from-sky-100 via-blue-50 to-white",
  },
  {
    slug: "staples-grains",
    name: "Staples & Grains",
    tagline: "Atta, rice, dal & oils",
    emoji: "🌾",
    gradient: "from-amber-100 via-orange-50 to-white",
  },
  {
    slug: "snacks",
    name: "Snacks",
    tagline: "Namkeen, biscuits & chips",
    emoji: "🍪",
    gradient: "from-rose-100 via-orange-50 to-white",
  },
  {
    slug: "beverages",
    name: "Beverages",
    tagline: "Tea, coffee & cold drinks",
    emoji: "🥤",
    gradient: "from-violet-100 via-indigo-50 to-white",
  },
  {
    slug: "household",
    name: "Household",
    tagline: "Cleaning & kitchen essentials",
    emoji: "🧴",
    gradient: "from-cyan-100 via-teal-50 to-white",
  },
  {
    slug: "personal-care",
    name: "Personal Care",
    tagline: "Everyday care for the family",
    emoji: "🧼",
    gradient: "from-fuchsia-100 via-pink-50 to-white",
  },
];

const p = (product: Omit<Product, "image" | "inStock"> & { inStock?: boolean }): Product => ({
  ...product,
  inStock: product.inStock ?? true,
  image: `/products/${product.id}.svg`,
});

export const products: Product[] = [
  // Fruits & Vegetables
  p({
    id: "banana-robusta",
    name: "Banana Robusta",
    brand: "Farm Fresh",
    price: 54,
    mrp: 62,
    unit: "1 dozen",
    variants: [
      { unit: "6 pieces", price: 29 },
      { unit: "1 dozen", price: 54 },
    ],
    category: "fruits-vegetables",
    description:
      "Naturally ripened robusta bananas, sweet and firm. Great for breakfast bowls, shakes and lunchboxes.",
    emoji: "🍌",
    featured: true,
  }),
  p({
    id: "shimla-apple",
    name: "Shimla Apple",
    brand: "Hill Harvest",
    price: 189,
    mrp: 210,
    unit: "1 kg",
    variants: [
      { unit: "500 g", price: 99 },
      { unit: "1 kg", price: 189 },
    ],
    category: "fruits-vegetables",
    description: "Crisp, juicy apples from Himachal orchards. Hand-graded for uniform size and colour.",
    emoji: "🍎",
    featured: true,
  }),
  p({
    id: "tomato-hybrid",
    name: "Tomato Hybrid",
    brand: "Farm Fresh",
    price: 32,
    unit: "1 kg",
    category: "fruits-vegetables",
    description: "Firm, tangy hybrid tomatoes — the base of every North Indian gravy.",
    emoji: "🍅",
  }),
  p({
    id: "onion",
    name: "Onion",
    brand: "Farm Fresh",
    price: 38,
    unit: "1 kg",
    category: "fruits-vegetables",
    description: "Nashik red onions, cleaned and sorted, with a sharp bite that mellows on cooking.",
    emoji: "🧅",
  }),
  p({
    id: "potato",
    name: "Potato",
    brand: "Farm Fresh",
    price: 30,
    unit: "1 kg",
    category: "fruits-vegetables",
    description: "All-purpose potatoes for sabzi, parathas and fries.",
    emoji: "🥔",
  }),
  p({
    id: "spinach-palak",
    name: "Spinach (Palak)",
    brand: "Farm Fresh",
    price: 25,
    unit: "500 g bunch",
    category: "fruits-vegetables",
    description: "Tender palak leaves, washed and bunched the same morning they arrive.",
    emoji: "🥬",
  }),

  // Dairy & Bakery
  p({
    id: "amul-taaza-milk",
    name: "Amul Taaza Toned Milk",
    brand: "Amul",
    price: 33,
    unit: "500 ml",
    variants: [
      { unit: "500 ml", price: 33 },
      { unit: "1 L", price: 66 },
    ],
    category: "dairy-bakery",
    description: "Homogenised toned milk in a tetra pack. Keeps for months unopened, no refrigeration needed.",
    emoji: "🥛",
    featured: true,
  }),
  p({
    id: "amul-butter",
    name: "Amul Butter",
    brand: "Amul",
    price: 62,
    mrp: 64,
    unit: "100 g",
    variants: [
      { unit: "100 g", price: 62 },
      { unit: "500 g", price: 285 },
    ],
    category: "dairy-bakery",
    description: "Utterly butterly delicious — salted table butter for toast, parathas and dal makhani.",
    emoji: "🧈",
  }),
  p({
    id: "paneer-fresh",
    name: "Fresh Malai Paneer",
    brand: "Mother Dairy",
    price: 95,
    unit: "200 g",
    category: "dairy-bakery",
    description: "Soft, milky paneer blocks delivered chilled. Best used within two days.",
    emoji: "🧀",
    featured: true,
  }),
  p({
    id: "brown-bread",
    name: "Whole Wheat Brown Bread",
    brand: "Britannia",
    price: 45,
    unit: "400 g",
    category: "dairy-bakery",
    description: "Soft whole-wheat loaf baked daily and delivered same day.",
    emoji: "🍞",
  }),
  p({
    id: "curd-dahi",
    name: "Fresh Dahi",
    brand: "Mother Dairy",
    price: 40,
    unit: "400 g cup",
    category: "dairy-bakery",
    description: "Thick set curd with a mild, clean finish. Perfect for raita and lassi.",
    emoji: "🥣",
  }),
  p({
    id: "eggs-tray",
    name: "Farm Eggs",
    brand: "Daily Fresh",
    price: 84,
    unit: "12 pieces",
    category: "dairy-bakery",
    description: "Protein-rich white eggs, individually checked before packing.",
    emoji: "🥚",
  }),

  // Staples & Grains
  p({
    id: "aashirvaad-atta",
    name: "Aashirvaad Whole Wheat Atta",
    brand: "Aashirvaad",
    price: 355,
    mrp: 390,
    unit: "5 kg",
    variants: [
      { unit: "5 kg", price: 355 },
      { unit: "10 kg", price: 690 },
    ],
    category: "staples-grains",
    description: "100% whole wheat atta milled from sharbati wheat for soft, fluffy rotis.",
    emoji: "🌾",
    featured: true,
  }),
  p({
    id: "india-gate-basmati",
    name: "India Gate Classic Basmati Rice",
    brand: "India Gate",
    price: 520,
    unit: "5 kg",
    category: "staples-grains",
    description: "Aged long-grain basmati that cooks fluffy and separate — ideal for biryani and pulao.",
    emoji: "🍚",
  }),
  p({
    id: "toor-dal",
    name: "Toor Dal (Arhar)",
    brand: "Tata Sampann",
    price: 175,
    unit: "1 kg",
    category: "staples-grains",
    description: "Unpolished toor dal with a natural shine, cooks soft in minutes.",
    emoji: "🫘",
  }),
  p({
    id: "fortune-mustard-oil",
    name: "Fortune Kachi Ghani Mustard Oil",
    brand: "Fortune",
    price: 165,
    unit: "1 L",
    category: "staples-grains",
    description: "Cold-pressed mustard oil with the pungency North Indian kitchens expect.",
    emoji: "🫒",
  }),
  p({
    id: "tata-salt",
    name: "Tata Salt Iodised",
    brand: "Tata",
    price: 28,
    unit: "1 kg",
    category: "staples-grains",
    description: "Vacuum-evaporated iodised salt — the everyday kitchen standard.",
    emoji: "🧂",
  }),
  p({
    id: "sugar-refined",
    name: "Refined Sugar",
    brand: "Madhur",
    price: 58,
    unit: "1 kg",
    category: "staples-grains",
    description: "Sparkling white, free-flowing sugar crystals for tea, sweets and baking.",
    emoji: "🍬",
  }),

  // Snacks
  p({
    id: "haldiram-bhujia",
    name: "Haldiram's Aloo Bhujia",
    brand: "Haldiram's",
    price: 52,
    unit: "200 g",
    category: "snacks",
    description: "Crisp potato bhujia with a gentle spice — the default tea-time namkeen.",
    emoji: "🥨",
    featured: true,
  }),
  p({
    id: "parle-g",
    name: "Parle-G Original Glucose Biscuits",
    brand: "Parle",
    price: 30,
    unit: "800 g family pack",
    category: "snacks",
    description: "The biscuit that needs no introduction. Family pack for the whole month.",
    emoji: "🍪",
  }),
  p({
    id: "lays-classic",
    name: "Lay's Classic Salted Chips",
    brand: "Lay's",
    price: 20,
    unit: "52 g",
    category: "snacks",
    description: "Thin, crunchy potato chips with just the right amount of salt.",
    emoji: "🥔",
  }),
  p({
    id: "good-day-cashew",
    name: "Britannia Good Day Cashew",
    brand: "Britannia",
    price: 45,
    unit: "200 g",
    category: "snacks",
    description: "Buttery cookies studded with cashew pieces.",
    emoji: "🍪",
  }),
  p({
    id: "roasted-peanuts",
    name: "Roasted Salted Peanuts",
    brand: "Store Fresh",
    price: 60,
    unit: "500 g",
    category: "snacks",
    description: "Roasted in small batches at the shop and packed the same day.",
    emoji: "🥜",
  }),
  p({
    id: "maggi-noodles",
    name: "Maggi 2-Minute Masala Noodles",
    brand: "Nestlé",
    price: 84,
    unit: "Pack of 6",
    category: "snacks",
    description: "The classic masala instant noodles, in a six-pack for busy weeks.",
    emoji: "🍜",
  }),

  // Beverages
  p({
    id: "tata-tea-gold",
    name: "Tata Tea Gold",
    brand: "Tata Tea",
    price: 270,
    mrp: 295,
    unit: "500 g",
    category: "beverages",
    description: "A blend of gently rolled long leaves and assam leaf for a rich, aromatic cup.",
    emoji: "🍵",
    featured: true,
  }),
  p({
    id: "nescafe-classic",
    name: "Nescafé Classic Instant Coffee",
    brand: "Nescafé",
    price: 320,
    unit: "100 g jar",
    category: "beverages",
    description: "100% pure instant coffee with a bold roasted aroma.",
    emoji: "☕",
  }),
  p({
    id: "real-mixed-fruit",
    name: "Real Mixed Fruit Juice",
    brand: "Dabur Real",
    price: 110,
    unit: "1 L",
    category: "beverages",
    description: "Fruit juice blend with no added preservatives, chilled and ready to pour.",
    emoji: "🧃",
  }),
  p({
    id: "bisleri-water",
    name: "Bisleri Packaged Drinking Water",
    brand: "Bisleri",
    price: 20,
    unit: "1 L",
    category: "beverages",
    description: "Multi-stage purified and mineral-balanced drinking water.",
    emoji: "💧",
  }),
  p({
    id: "coca-cola",
    name: "Coca-Cola",
    brand: "Coca-Cola",
    price: 40,
    unit: "750 ml",
    category: "beverages",
    description: "Chilled bottle of the original cola. Delivered cold on request.",
    emoji: "🥤",
  }),
  p({
    id: "bournvita",
    name: "Cadbury Bournvita Health Drink",
    brand: "Cadbury",
    price: 245,
    unit: "750 g",
    category: "beverages",
    description: "Malted chocolate health drink mix with vitamins and minerals.",
    emoji: "🍫",
  }),

  // Household
  p({
    id: "surf-excel",
    name: "Surf Excel Easy Wash Detergent",
    brand: "Surf Excel",
    price: 210,
    mrp: 230,
    unit: "2 kg",
    category: "household",
    description: "Tough on stains, gentle on fabric — for bucket and machine wash.",
    emoji: "🧺",
    featured: true,
  }),
  p({
    id: "vim-bar",
    name: "Vim Dishwash Bar",
    brand: "Vim",
    price: 30,
    unit: "Pack of 3",
    category: "household",
    description: "Cuts through grease quickly with a fresh lemon fragrance.",
    emoji: "🍋",
  }),
  p({
    id: "harpic-toilet-cleaner",
    name: "Harpic Power Plus Toilet Cleaner",
    brand: "Harpic",
    price: 185,
    unit: "1 L",
    category: "household",
    description: "Thick liquid cleaner that clings to the bowl and removes tough stains.",
    emoji: "🚽",
  }),
  p({
    id: "lizol-floor-cleaner",
    name: "Lizol Floor Cleaner Citrus",
    brand: "Lizol",
    price: 199,
    unit: "975 ml",
    category: "household",
    description: "Disinfectant floor cleaner that leaves a long-lasting citrus finish.",
    emoji: "🧴",
  }),
  p({
    id: "garbage-bags",
    name: "Biodegradable Garbage Bags",
    brand: "Store Choice",
    price: 149,
    unit: "Medium, 90 bags",
    category: "household",
    description: "Leak-proof, easy-tie garbage bags in a convenient roll.",
    emoji: "🗑️",
  }),
  p({
    id: "aluminium-foil",
    name: "Kitchen Aluminium Foil",
    brand: "Freshwrapp",
    price: 175,
    unit: "72 m",
    category: "household",
    description: "Food-grade foil for packing rotis and lining baking trays.",
    emoji: "🧻",
  }),

  // Personal Care
  p({
    id: "colgate-strong-teeth",
    name: "Colgate Strong Teeth Toothpaste",
    brand: "Colgate",
    price: 105,
    unit: "200 g",
    category: "personal-care",
    description: "Calcium-boost formula for cavity protection and stronger enamel.",
    emoji: "🪥",
    featured: true,
  }),
  p({
    id: "dove-soap",
    name: "Dove Cream Beauty Bathing Bar",
    brand: "Dove",
    price: 235,
    unit: "Pack of 4 × 100 g",
    category: "personal-care",
    description: "Moisturising bathing bar with a quarter moisturising cream.",
    emoji: "🧼",
  }),
  p({
    id: "clinic-plus-shampoo",
    name: "Clinic Plus Strong & Long Shampoo",
    brand: "Clinic Plus",
    price: 199,
    unit: "650 ml",
    category: "personal-care",
    description: "Milk protein shampoo for everyday wash and reduced hair fall.",
    emoji: "🧴",
  }),
  p({
    id: "nivea-body-lotion",
    name: "Nivea Nourishing Body Milk",
    brand: "Nivea",
    price: 349,
    unit: "400 ml",
    category: "personal-care",
    description: "Deep moisture serum body lotion for dry skin, absorbs quickly.",
    emoji: "🧴",
  }),
  p({
    id: "gillette-razor",
    name: "Gillette Guard Razor",
    brand: "Gillette",
    price: 60,
    unit: "1 razor + 2 cartridges",
    category: "personal-care",
    description: "Lightweight safety razor with a single blade and safety comb.",
    emoji: "🪒",
  }),
  p({
    id: "dettol-handwash",
    name: "Dettol Original Handwash Refill",
    brand: "Dettol",
    price: 99,
    unit: "750 ml",
    category: "personal-care",
    description: "Germ-protection handwash refill pouch, pH balanced for daily use.",
    emoji: "🫧",
  }),
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((product) => product.category === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((product) =>
    [product.name, product.brand, product.description, product.category]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
}
