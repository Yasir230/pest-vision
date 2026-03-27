import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PEST-VISION Command Center — Smart Agricultural Monitoring",
  description:
    "Sustainable agricultural monitoring platform for ASEAN paddy fields. Real-time pest detection, precision spray management, and AI-powered analytics for Brown Planthopper (BPH) eradication.",
  keywords: [
    "pest monitoring",
    "smart agriculture",
    "brown planthopper",
    "precision farming",
    "ASEAN agriculture",
    "edge AI",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
