"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiTrash, HiShoppingCart, HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, removeItem, totalPrice } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-20 h-20 mx-auto bg-dark-800 rounded-full flex items-center justify-center mb-6">
            <HiShoppingCart className="w-10 h-10 text-dark-500" />
          </div>
          <h1 className="text-3xl font-bold text-dark-50 mb-3">Your Cart is Empty</h1>
          <p className="text-dark-400 mb-8">
            Browse our gallery to find something you love.
          </p>
          <Link href="/gallery" className="btn-primary">
            <HiArrowLeft className="mr-2 w-5 h-5" />
            Browse Gallery
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="section-title">Your Cart</h1>
          <p className="section-subtitle">
            {items.length} {items.length === 1 ? "picture" : "pictures"} selected
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((item, i) => (
                <motion.div
                  key={item.productId}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="card flex flex-col sm:flex-row overflow-hidden"
                >
                  <div className="relative w-full sm:w-48 h-48 shrink-0 overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 192px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-dark-50">{item.title}</h3>
                        <span className="text-xs text-dark-500 uppercase">{item.downloadType}</span>
                      </div>
                      <span className="text-xl font-bold text-primary-400 shrink-0">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => removeItem(item.productId)}
                      className="flex items-center gap-2 text-dark-400 hover:text-red-400 transition-colors duration-300 text-sm mt-4 sm:mt-0 self-start"
                    >
                      <HiTrash className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card p-6 sticky top-24"
            >
              <h2 className="text-xl font-bold text-dark-50 mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span className="text-dark-400 truncate mr-4">{item.title}</span>
                    <span className="text-dark-200 font-medium">${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-dark-700 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-dark-50 font-semibold text-lg">Total</span>
                  <span className="text-2xl font-bold text-primary-400">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => router.push("/checkout")}
                className="btn-primary w-full text-lg py-4 flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <HiArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
