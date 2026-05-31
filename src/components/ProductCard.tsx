"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HiShoppingCart, HiEye } from "react-icons/hi";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import Watermark from "./Watermark";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const { addItem, items } = useCart();
  const inCart = items.some((item) => item.productId === product.id);
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="card group cursor-pointer"
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              loading="lazy"
              onError={() => setImgError(true)}
            />
            {imgError && (
              <div className="absolute inset-0 flex items-center justify-center bg-dark-800">
                <span className="text-dark-500 text-sm">{product.title}</span>
              </div>
            )}
          </motion.div>
          <Watermark />
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-primary-400 font-medium uppercase tracking-widest">
            {product.category}
          </span>
          <span className="text-sm font-bold text-primary-400">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <h3 className="text-white font-semibold text-lg leading-tight">
          <Link
            href={`/product/${product.id}`}
            className="hover:text-primary-400 transition-colors duration-300"
          >
            {product.title}
          </Link>
        </h3>
      </div>
    </motion.div>
  );
}
