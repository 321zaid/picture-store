"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HiArrowLeft, HiLockClosed, HiExclamation } from "react-icons/hi";
import { useCart } from "@/context/CartContext";
import { CartItem } from "@/types";

const isLocalDev = (process.env.NEXT_PUBLIC_BASE_URL || "").includes("localhost");

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stripeNotConfigured, setStripeNotConfigured] = useState(() => {
    const pk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    return !pk || !pk.startsWith("pk_");
  });

  if (items.length === 0) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-dark-50 mb-3">Nothing to Checkout</h1>
          <p className="text-dark-400 mb-8">Your cart is empty.</p>
          <Link href="/gallery" className="btn-primary">
            <HiArrowLeft className="mr-2 w-5 h-5" />
            Browse Gallery
          </Link>
        </motion.div>
      </div>
    );
  }

  const handleCheckout = async () => {
    setLoading(true);
    setError("");
    setStripeNotConfigured(false);

    try {
      const orderData = {
        id: "PENDING-" + Date.now().toString(36).toUpperCase(),
        items: items as CartItem[],
        total: totalPrice,
        date: new Date().toISOString(),
      };
      sessionStorage.setItem("pendingOrder", JSON.stringify(orderData));

      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.productId,
            title: item.title,
            price: item.price,
          })),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        sessionStorage.removeItem("pendingOrder");
        if (res.status === 503) {
          setStripeNotConfigured(true);
        }
        throw new Error(err.error || "Checkout failed");
      }

      const { url } = await res.json();
      clearCart();
      window.location.href = url;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/cart" className="inline-flex items-center gap-2 text-dark-400 hover:text-primary-400 transition-colors duration-300 mb-8">
            <HiArrowLeft className="w-5 h-5" />
            Back to Cart
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="section-title mb-2">Checkout</h1>
          <p className="section-subtitle mb-8">
            Purchasing {items.length} {items.length === 1 ? "picture" : "pictures"}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="card p-6 mb-8"
        >
          <h2 className="text-lg font-semibold text-dark-50 mb-4">Order Summary</h2>
          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={item.productId} className="flex items-center gap-4 p-3 bg-dark-800/50 rounded-lg">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                  <Image src={item.imageUrl} alt={item.title} fill sizes="64px" className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-dark-50 font-medium truncate">{item.title}</p>
                  <p className="text-dark-500 text-sm">{item.downloadType}</p>
                </div>
                <span className="text-primary-400 font-semibold">${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-dark-700 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-dark-50 font-semibold text-lg">Total</span>
              <span className="text-2xl font-bold text-primary-400">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              className="mb-6 p-4 bg-red-900/30 border border-red-800 rounded-lg text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {stripeNotConfigured ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-5 bg-amber-900/30 border border-amber-800 rounded-lg"
          >
            <div className="flex items-start gap-3">
              <HiExclamation className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-amber-300 font-semibold mb-1">Stripe is not configured yet</h3>
                <p className="text-amber-400/80 text-sm leading-relaxed">
                  {isLocalDev ? (
                    <>Add Stripe test keys to <code className="text-amber-300 bg-amber-900/50 px-1 rounded">.env.local</code>.</>
                  ) : (
                    <>Add Stripe keys in <strong>Render Dashboard → Environment</strong>.</>
                  )}
                </p>
                <p className="text-amber-400/70 text-xs mt-2">
                  Cart, gallery, and all other pages still work without it.
                </p>
              </div>
            </div>
          </motion.div>
        ) : null}

        <button
          onClick={handleCheckout}
          disabled={loading || stripeNotConfigured}
          className="btn-primary w-full text-lg py-4 flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Redirecting to Stripe...
            </span>
          ) : stripeNotConfigured ? (
            <span className="flex items-center gap-2">
              <HiLockClosed className="w-5 h-5" />
              Stripe not configured
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <HiLockClosed className="w-5 h-5" />
              Pay ${totalPrice.toFixed(2)} with Stripe
            </span>
          )}
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 p-4 bg-dark-800/50 rounded-lg border border-dark-700"
        >
          <p className="text-dark-500 text-xs">
            Secured by Stripe. You will be redirected to Stripe's hosted checkout page to complete payment.
            No card details are stored on this site.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
