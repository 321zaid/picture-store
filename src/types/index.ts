export type DownloadType = "JPG" | "PNG" | "ZIP";

export type ProductCategory =
  | "Nature"
  | "Urban"
  | "Portrait"
  | "Abstract"
  | "Wildlife"
  | "Travel"
  | "Architecture"
  | "Food"
  | "Photography"
  | "All";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: ProductCategory;
  downloadType: DownloadType;
  imageUrl: string;
  downloadUrl: string;
  featured: boolean;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  title: string;
  price: number;
  imageUrl: string;
  downloadUrl: string;
  downloadType: DownloadType;
}

export interface CheckoutSession {
  sessionId: string;
  url: string;
}

export interface AdminLogin {
  username: string;
  password: string;
}
