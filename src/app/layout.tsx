import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Beyaz Martı Spor Kulübü",
  description: "Beyaz Martı Spor Kulübü resmi web sitesi",
  keywords: ["spor", "kulüp", "beyaz martı", "futbol", "basketbol"],
  authors: [{ name: "Beyaz Martı Spor Kulübü" }],
  openGraph: {
    title: "Beyaz Martı Spor Kulübü",
    description: "Beyaz Martı Spor Kulübü resmi web sitesi",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${inter.variable} ${manrope.variable} font-sans antialiased bg-background text-text`}
      >
        {children}
      </body>
    </html>
  );
}
