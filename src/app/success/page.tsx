"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HiCheckCircle, HiDownload, HiShoppingBag } from "react-icons/hi";
import { CartItem } from "@/types";

interface OrderData {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [order, setOrder] = useState<OrderData | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    try {
      const pending = sessionStorage.getItem("pendingOrder");
      if (pending) {
        const parsed: OrderData = JSON.parse(pending);
        setOrder({ ...parsed, id: sessionId || parsed.id });
        sessionStorage.setItem("lastOrder", JSON.stringify({ ...parsed, id: sessionId || parsed.id }));
        sessionStorage.removeItem("pendingOrder");
      } else {
        const saved = sessionStorage.getItem("lastOrder");
        if (saved) setOrder(JSON.parse(saved));
      }
    } catch {}
  }, [sessionId]);

  const handleDownload = (item: CartItem) => {
    setDownloading(item.productId);
    setTimeout(() => {
      window.open(item.downloadUrl, "_blank");
      setDownloading(null);
    }, 1000);
  };

  const downloadAll = () => {
    if (!order) return;
    order.items.forEach((item, i) => setTimeout(() => window.open(item.downloadUrl, "_blank"), i * 400));
  };

  if (!sessionId) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold text-dark-50 mb-4">No Order Found</h1>
          <Link href="/gallery" className="btn-primary">
            <HiShoppingBag className="mr-2 w-5 h-5" />
            Browse Gallery
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
            <HiCheckCircle className="w-12 h-12 text-emerald-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-dark-50 mb-3">
            Payment Successful!
          </h1>
          <p className="text-dark-400 text-lg">
            Your images are ready to download.
          </p>
          {order && (
            <p className="text-dark-500 text-sm mt-2">
              Order: <span className="text-primary-400 font-mono">{order.id}</span>
            </p>
          )}
        </motion.div>

        {order && order.items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="card p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-dark-50">Your Downloads</h2>
                <button onClick={downloadAll} className="btn-primary text-sm flex items-center gap-2">
                  <HiDownload className="w-4 h-4" />
                  Download All
                </button>
              </div>
              <div className="space-y-4">
                {order.items.map((item, i) => (
                  <motion.div
                    key={item.productId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                    className="flex items-center gap-4 p-4 bg-dark-800/50 rounded-lg"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                      <Image src={item.imageUrl} alt={item.title} fill sizes="80px" className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-dark-50 font-medium truncate">{item.title}</p>
                      <p className="text-dark-500 text-sm">{item.downloadType} &middot; ${item.price.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => handleDownload(item)}
                      disabled={downloading === item.productId}
                      className="btn-secondary text-sm shrink-0 flex items-center gap-1"
                    >
                      {downloading === item.productId ? (
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      ) : (
                        <><HiDownload className="w-4 h-4" /> Download</>
                      )}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <Link href="/gallery" className="btn-primary inline-flex items-center gap-2">
                <HiShoppingBag className="w-5 h-5" />
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
