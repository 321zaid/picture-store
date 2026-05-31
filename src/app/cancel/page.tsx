"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiXCircle, HiArrowLeft, HiShoppingCart } from "react-icons/hi";

export default function CancelPage() {
  return (
    <div className="pt-24 min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-20 h-20 mx-auto bg-red-500/20 rounded-full flex items-center justify-center mb-6">
            <HiXCircle className="w-12 h-12 text-red-400" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-dark-50 mb-3">
            Payment Cancelled
          </h1>

          <p className="text-dark-400 text-lg mb-8">
            No charges have been made.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/cart" className="btn-primary flex items-center gap-2">
              <HiShoppingCart className="w-5 h-5" />
              Return to Cart
            </Link>
            <Link href="/gallery" className="btn-secondary flex items-center gap-2">
              <HiArrowLeft className="w-5 h-5" />
              Browse Gallery
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
