"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  HiPlus,
  HiPencil,
  HiTrash,
  HiLogout,
  HiPhotograph,
  HiShieldCheck,
  HiRefresh,
} from "react-icons/hi";
import { Product } from "@/types";

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const isAuthenticated = typeof window !== "undefined" && sessionStorage.getItem("adminAuthenticated") === "true";

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login");
    } else {
      fetchProducts();
    }
  }, [isAuthenticated, router]);

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/products");
      if (!res.ok) throw new Error("Failed to load products");
      const data = await res.json();
      setProducts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem("adminAuthenticated");
    router.push("/admin/login");
  }, [router]);

  if (!isAuthenticated) return null;

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-dark-50 flex items-center gap-3">
              <HiShieldCheck className="text-primary-400" />
              Admin Dashboard
            </h1>
            <p className="text-dark-500 text-sm mt-1">Manage your product catalog</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchProducts} className="btn-secondary text-sm flex items-center gap-1">
              <HiRefresh className="w-4 h-4" />
              Refresh
            </button>
            <button onClick={handleLogout} className="btn-secondary text-sm flex items-center gap-1 text-red-400 border-red-800 hover:bg-red-900/30">
              <HiLogout className="w-4 h-4" />
              Logout
            </button>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400 mb-4">{error}</p>
            <button onClick={fetchProducts} className="btn-primary">Retry</button>
          </div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 flex items-center justify-between"
            >
              <p className="text-dark-400 text-sm">{products.length} products</p>
              <button className="btn-primary text-sm flex items-center gap-1">
                <HiPlus className="w-4 h-4" />
                Add Product
              </button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                  className="card p-4"
                >
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-3">
                    <Image src={product.imageUrl} alt={product.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                  </div>
                  <h3 className="text-dark-50 font-medium truncate">{product.title}</h3>
                  <p className="text-primary-400 font-semibold text-sm mb-3">${product.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2">
                    <button className="btn-secondary text-xs flex items-center gap-1 flex-1 justify-center py-2">
                      <HiPencil className="w-3 h-3" />
                      Edit
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="btn-secondary text-xs flex items-center gap-1 flex-1 justify-center py-2 text-red-400 border-red-800 hover:bg-red-900/30">
                      <HiTrash className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-20">
                <HiPhotograph className="w-12 h-12 text-dark-600 mx-auto mb-4" />
                <p className="text-dark-500">No products yet</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
