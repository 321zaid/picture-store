import { Product } from "@/types";

const products: Product[] = [
  {
    id: "1",
    title: "Golden Hour",
    description: "A beautifully captured moment during golden hour, showcasing warm tones and soft natural lighting in this premium photograph.",
    price: 2.00,
    category: "Photography",
    downloadType: "PNG",
    imageUrl: "/images/screenshot-2025-06-01-221950.png",
    downloadUrl: "/images/screenshot-2025-06-01-221950.png",
    featured: true,
    createdAt: "2025-06-01",
  },
  {
    id: "2",
    title: "Midnight Glow",
    description: "An atmospheric night scene with subtle glow effects, perfect for adding depth and mood to any digital project.",
    price: 2.00,
    category: "Photography",
    downloadType: "PNG",
    imageUrl: "/images/screenshot-2025-06-02-031722.png",
    downloadUrl: "/images/screenshot-2025-06-02-031722.png",
    featured: true,
    createdAt: "2025-06-02",
  },
  {
    id: "3",
    title: "Lunar Eclipse",
    description: "A dramatic dark composition with striking contrast, ideal for wallpapers, backgrounds, and creative designs.",
    price: 2.00,
    category: "Photography",
    downloadType: "PNG",
    imageUrl: "/images/screenshot-2025-06-02-043107.png",
    downloadUrl: "/images/screenshot-2025-06-02-043107.png",
    featured: true,
    createdAt: "2025-06-02",
  },
  {
    id: "4",
    title: "Morning Light",
    description: "Soft morning light filtering through the frame creates a serene and calming visual experience.",
    price: 2.00,
    category: "Photography",
    downloadType: "PNG",
    imageUrl: "/images/screenshot-2025-06-06-085507.png",
    downloadUrl: "/images/screenshot-2025-06-06-085507.png",
    featured: true,
    createdAt: "2025-06-06",
  },
  {
    id: "5",
    title: "Crystal Clear",
    description: "A crisp and vibrant capture with excellent detail and clarity, suitable for high-resolution displays.",
    price: 2.00,
    category: "Photography",
    downloadType: "PNG",
    imageUrl: "/images/screenshot-2025-06-06-085524.png",
    downloadUrl: "/images/screenshot-2025-06-06-085524.png",
    featured: true,
    createdAt: "2025-06-06",
  },
  {
    id: "6",
    title: "Summer Night",
    description: "A warm summer night captured in stunning detail, blending twilight hues with urban ambiance.",
    price: 2.00,
    category: "Photography",
    downloadType: "PNG",
    imageUrl: "/images/screenshot-2025-07-02-233718.png",
    downloadUrl: "/images/screenshot-2025-07-02-233718.png",
    featured: true,
    createdAt: "2025-07-02",
  },
  {
    id: "7",
    title: "Neon Dreams",
    description: "Vibrant neon tones and deep shadows create a futuristic aesthetic in this bold visual composition.",
    price: 2.00,
    category: "Photography",
    downloadType: "PNG",
    imageUrl: "/images/screenshot-2025-07-04-222142.png",
    downloadUrl: "/images/screenshot-2025-07-04-222142.png",
    featured: false,
    createdAt: "2025-07-04",
  },
  {
    id: "8",
    title: "Starburst",
    description: "A bright and energetic composition with explosive light effects and vivid color contrast.",
    price: 2.00,
    category: "Photography",
    downloadType: "PNG",
    imageUrl: "/images/screenshot-2025-07-04-234503.png",
    downloadUrl: "/images/screenshot-2025-07-04-234503.png",
    featured: false,
    createdAt: "2025-07-04",
  },
  {
    id: "9",
    title: "Autumn Breeze",
    description: "A cool-toned photograph evoking the transition of seasons with a calm and reflective mood.",
    price: 2.00,
    category: "Photography",
    downloadType: "PNG",
    imageUrl: "/images/screenshot-2025-09-09-011834.png",
    downloadUrl: "/images/screenshot-2025-09-09-011834.png",
    featured: false,
    createdAt: "2025-09-09",
  },
  {
    id: "10",
    title: "Silhouette",
    description: "A minimalist silhouette composition with strong contrast between light and dark elements.",
    price: 2.00,
    category: "Photography",
    downloadType: "PNG",
    imageUrl: "/images/screenshot-2025-09-09-011840.png",
    downloadUrl: "/images/screenshot-2025-09-09-011840.png",
    featured: false,
    createdAt: "2025-09-09",
  },
  {
    id: "11",
    title: "Urban Jungle",
    description: "A chaotic yet beautiful arrangement of urban textures and patterns captured in a single frame.",
    price: 2.00,
    category: "Photography",
    downloadType: "PNG",
    imageUrl: "/images/screenshot-2025-09-09-022007.png",
    downloadUrl: "/images/screenshot-2025-09-09-022007.png",
    featured: false,
    createdAt: "2025-09-09",
  },
  {
    id: "12",
    title: "Winter Chill",
    description: "A cold and crisp winter scene with muted tones and a serene atmosphere, perfect for minimalistic aesthetics.",
    price: 2.00,
    category: "Photography",
    downloadType: "PNG",
    imageUrl: "/images/screenshot-2025-11-29-062216.png",
    downloadUrl: "/images/screenshot-2025-11-29-062216.png",
    featured: false,
    createdAt: "2025-11-29",
  },
];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function deleteProduct(id: string): boolean {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  return true;
}

export default products;
