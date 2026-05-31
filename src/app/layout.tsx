import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProviderWrapper } from "@/context/CartProviderWrapper";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "Sexpixel - Premium Digital Photography Marketplace",
  description:
    "Discover and purchase stunning high-resolution digital photographs for your creative projects.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col antialiased">
        <CartProviderWrapper>
          <Navbar />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </CartProviderWrapper>
      </body>
    </html>
  );
}
