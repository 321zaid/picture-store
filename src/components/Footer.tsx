"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const staggerParent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const staggerChild = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <footer ref={ref} className="border-t border-dark-800 bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          <motion.div variants={staggerChild} className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <motion.div
                whileHover={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 0.5 }}
                className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center"
              >
                <span className="text-white font-bold text-sm">S</span>
              </motion.div>
              <span className="text-xl font-bold text-dark-50">Sexpixel</span>
            </Link>
            <p className="text-dark-500 text-sm leading-relaxed">
              Premium digital photography marketplace.
            </p>
          </motion.div>

          <motion.div variants={staggerChild}>
            <h3 className="text-dark-50 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/gallery", label: "Gallery" },
                { href: "/cart", label: "Cart" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-dark-400 hover:text-primary-400 text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={staggerChild}>
            <h3 className="text-dark-50 font-semibold mb-4">Policies</h3>
            <ul className="space-y-2">
              {["Terms of Service", "Privacy Policy", "Refund Policy"].map(
                (item) => (
                  <li key={item}>
                    <span className="text-dark-500 text-sm">{item}</span>
                  </li>
                )
              )}
            </ul>
          </motion.div>

          <motion.div variants={staggerChild}>
            <h3 className="text-dark-50 font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-dark-500 text-sm">
              <li>support@secpixel.demo</li>
              <li>San Francisco, CA</li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-dark-800 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-dark-500 text-sm">
            &copy; {new Date().getFullYear()} Sexpixel.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
