import { NextResponse } from "next/server";
import { getAllProducts, getProductById } from "@/lib/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const product = getProductById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  }

  const products = getAllProducts();
  return NextResponse.json(products);
}
