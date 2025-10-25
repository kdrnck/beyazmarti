import type { Metadata } from "next";
import "./globals.css";

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
      <body className="font-sans antialiased bg-background text-text" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
