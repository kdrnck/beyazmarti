"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const navigation = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Kulüp Hakkında", href: "/kulup-hakkinda" },
  { name: "Takımlarımız", href: "/takimlarimiz" },
  { name: "Hazırlık Grupları", href: "/hazirlik-gruplari" },
  { name: "Yönetim Kurulu", href: "/yonetim-kurulu" },
  { name: "Teknik Ekip", href: "/teknik-ekip" },
  { name: "Blog", href: "/blog" },
  { name: "İletişim", href: "/iletisim" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? "bg-primary/95 backdrop-blur-md shadow-lg border-b border-primary/20" 
        : "bg-gradient-to-r from-primary via-primary-dark to-primary backdrop-blur-sm"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/logo.png"
                  alt="Beyaz Martı Spor Kulübü"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain"
                  priority
                />
              </div>
              {/* Hover effect - flying seagull animation */}
              <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="h-3 w-3 bg-accent rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg text-white leading-tight">
                Beyaz Martı
              </span>
              <span className="font-heading text-xs text-white/80 leading-tight">
                Spor Kulübü
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-white hover:text-white transition-all duration-300 group"
              >
                <span className="relative z-10">{item.name}</span>
                {/* Hover effect */}
                <div className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
                {/* Active indicator */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-accent group-hover:w-8 transition-all duration-300"></div>
              </Link>
            ))}
          </nav>


          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden text-white hover:bg-white/10 rounded-lg"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menüyü aç</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-primary-dark border-primary">
              <SheetTitle className="sr-only">Navigasyon Menüsü</SheetTitle>
              <div className="flex flex-col space-y-2 mt-8">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium text-white hover:text-accent transition-colors py-3 px-4 rounded-lg hover:bg-white/10"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
