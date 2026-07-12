import type { Metadata } from "next";
import { Inter, Fraunces, IBM_Plex_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { StoreHydrator } from "@/components/layout/store-hydrator";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Inkwell — Premium Stationery Store",
  description:
    "Discover handcrafted notebooks, premium pens, and fine paper. Quality stationery for thinkers, dreamers, and doers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${ibmPlexMono.variable}`}>
      <body className="min-h-screen bg-paper font-sans text-ink antialiased">
        <StoreHydrator />
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
