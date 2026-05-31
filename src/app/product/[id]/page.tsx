"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  HiShoppingCart,
  HiArrowLeft,
  HiDownload,
  HiTag,
} from "react-icons/hi";
import products from "@/lib/products";
import { useCart } from "@/context/CartContext";
import Watermark from "@/components/Watermark";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { addItem, items } = useCart();
  const [addingAnimation, setAddingAnimation] = useState(false);
  const [imgError, setImgError] = useState(false);
  const infoRef = useRef(null);
  const infoInView = useInView(infoRef, { once: true });

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-dark-50 mb-4">Not Found</h1>
          <p className="text-dark-400 mb-8">This picture does not exist.</p>
          <Link href="/gallery" className="btn-primary">
            <HiArrowLeft className="mr-2 w-5 h-5" />
            Back to Gallery
          </Link>
        </motion.div>
      </div>
    );
  }

  const inCart = items.some((item) => item.productId === product.id);

  const handleAddToCart = () => {
    addItem(product);
    setAddingAnimation(true);
    setTimeout(() => setAddingAnimation(false), 1000);
  };

  const handleBuyNow = () => {
    addItem(product);
    router.push("/cart");
  };

  const itemCount = items.length;

  return (
    <div className="pt-24 pb-16 min-h-screen relative">
      {/* Floating cart icon */}
      <Link
        href="/cart"
        className="fixed top-28 right-4 sm:right-6 lg:right-8 z-40 flex items-center justify-center w-12 h-12 bg-dark-800/90 backdrop-blur-sm border border-dark-700 rounded-full shadow-lg hover:border-primary-500/50 hover:bg-dark-700 transition-all duration-300 group"
        aria-label="View cart"
      >
        <HiShoppingCart className="w-5 h-5 text-dark-300 group-hover:text-primary-400 transition-colors duration-300" />
        {itemCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 bg-primary-500 text-white text-xs font-bold rounded-full shadow-md">
            {itemCount}
          </span>
        )}
      </Link>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-dark-400 hover:text-primary-400 transition-colors duration-300 mb-8"
          >
            <HiArrowLeft className="w-5 h-5" />
            Back to Gallery
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/3] lg:aspect-auto lg:h-[600px] rounded-2xl overflow-hidden card"
          >
            <div className="absolute inset-0">
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
                onError={() => setImgError(true)}
              />
              {imgError && (
                <div className="absolute inset-0 flex items-center justify-center bg-dark-800">
                  <span className="text-dark-400 text-lg">{product.title}</span>
                </div>
              )}
            </div>
            <Watermark />
          </motion.div>

          {/* Info */}
          <motion.div
            ref={infoRef}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-primary-600/20 text-primary-400 text-sm font-medium rounded-full border border-primary-500/30">
                {product.category}
              </span>
              <span className="px-3 py-1 bg-dark-800 text-dark-400 text-sm font-medium rounded-full border border-dark-700">
                {product.downloadType}
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={infoInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-50 leading-tight mb-4"
            >
              {product.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={infoInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="text-3xl md:text-4xl font-bold text-primary-400">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-dark-500 text-sm">
                High-resolution digital file
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={infoInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-dark-400 leading-relaxed text-lg mb-8"
            >
              {product.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={infoInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="space-y-4 mb-8"
            >
              <div className="flex items-center gap-3 text-dark-400">
                <HiDownload className="w-5 h-5 text-primary-400" />
                <span className="text-sm">
                  Download: <strong className="text-dark-50">{product.downloadType}</strong>
                </span>
              </div>
              <div className="flex items-center gap-3 text-dark-400">
                <HiTag className="w-5 h-5 text-primary-400" />
                <span className="text-sm">Commercial & personal use license</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={infoInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 mt-auto"
            >
              <button
                onClick={handleAddToCart}
                disabled={inCart}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-lg transition-all duration-300 ${
                  inCart
                    ? "bg-emerald-600 text-white cursor-default"
                    : addingAnimation
                    ? "bg-emerald-600 text-white"
                    : "btn-secondary text-lg"
                }`}
              >
                <HiShoppingCart className="w-5 h-5" />
                {inCart ? "Added to Cart" : "Add to Cart"}
              </button>
              <button
                onClick={handleBuyNow}
                className="btn-primary flex-1 text-lg py-3.5"
              >
                Buy Now — ${product.price.toFixed(2)}
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={infoInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-6 p-4 bg-dark-800/50 rounded-lg border border-dark-700"
            >
              <p className="text-dark-500 text-xs leading-relaxed">
                <strong className="text-dark-400">Secure checkout:</strong>{" "}
                Your payment is processed through Stripe. We never store
                your credit card details.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
