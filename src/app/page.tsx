"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import products from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Watermark from "@/components/Watermark";

const featured = products.filter((p) => p.featured).slice(0, 4);

const features = [
  {
    number: "01",
    title: "Premium Quality",
    desc: "High-resolution images up to 4K quality, perfect for any project.",
  },
  {
    number: "02",
    title: "Instant Download",
    desc: "Get immediate access after purchase with no waiting.",
  },
  {
    number: "03",
    title: "Secure Checkout",
    desc: "Protected by Stripe's industry-leading payment security.",
  },
];

export default function HomePage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div>
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-dark-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 via-dark-950 to-dark-950" />
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/60 via-primary-800/20 to-transparent" />
          </motion.div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
          <motion.div
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="max-w-3xl"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block px-5 py-2.5 bg-primary-600/20 backdrop-blur-md border border-primary-500/30 rounded-full text-primary-400 text-sm font-medium mb-6"
            >
              Premium Digital Photography
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight"
            >
              Discover Stunning{" "}
              <span className="text-gradient">Visual Stories</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 text-lg md:text-xl text-dark-400 max-w-xl leading-relaxed"
            >
              Explore our curated collection of high-resolution digital
              photographs. Perfect for designers, creators, and anyone who
              appreciates visual art.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-10 flex gap-4"
            >
              <Link href="/gallery" className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2 group">
                Browse Pictures
                <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-primary-400 text-sm font-medium uppercase tracking-[0.2em] mb-4">
              Why Choose Us
            </span>
            <h2 className="section-title">
              Premium Photography,{" "}
              <span className="text-gradient">Delivered</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="card p-8 group"
              >
                <span className="inline-block text-4xl font-bold text-dark-600 group-hover:text-primary-500/30 transition-colors duration-500">
                  {f.number}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-dark-50">
                  {f.title}
                </h3>
                <p className="mt-3 text-dark-500 leading-relaxed text-sm">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Pictures */}
      <section className="py-20 lg:py-28 bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
          >
            <div>
              <span className="inline-block text-primary-400 text-sm font-medium uppercase tracking-[0.2em] mb-4">
                Curated Selection
              </span>
              <h2 className="section-title">
                Featured <span className="text-gradient">Pictures</span>
              </h2>
              <p className="section-subtitle">
                Hand-picked from our premium collection.
              </p>
            </div>
            <Link href="/gallery" className="btn-secondary shrink-0 inline-flex items-center gap-2">
              View All
              <HiArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 p-8 md:p-16"
          >
            <div className="absolute inset-0 opacity-[0.08]">
              <motion.div
                animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"
              />
              <motion.div
                animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"
              />
            </div>

            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Ready to Start Your Collection?
              </h2>
              <p className="text-primary-100 text-lg md:text-xl mb-8">
                Join thousands of creators who trust Sexpixel.
              </p>
              <Link href="/gallery" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-bold rounded-lg hover:bg-primary-50 transition-colors duration-300 text-lg">
                Browse Gallery
                <HiArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
