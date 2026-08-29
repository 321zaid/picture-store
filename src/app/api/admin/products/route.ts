import { NextResponse } from "next/server";
import { getAllProducts, deleteProduct, getProductById } from "@/lib/products";

export const runtime = "edge";

export async function GET() {
  const products = getAllProducts();
  return NextResponse.json(products);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Product ID required" }, { status: 400 });
  }

  const product = getProductById(id);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  deleteProduct(id);
  return NextResponse.json({ success: true });
}
