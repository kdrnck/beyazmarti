import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo ve Açıklama */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center p-1">
                <Image
                  src="/logo.png"
                  alt="Beyaz Martı Spor Kulübü"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </div>
              <span className="font-heading font-bold text-xl">
                Beyaz Martı Spor Kulübü
              </span>
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              Beyaz Martı Spor Kulübü olarak sporun gücüyle gençlerimizi geleceğe hazırlıyoruz.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/hakkimizda" className="text-gray-300 hover:text-white transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/takimlarimiz" className="text-gray-300 hover:text-white transition-colors">
                  Takımlarımız
                </Link>
              </li>
              <li>
                <Link href="/teknik-kadromuz" className="text-gray-300 hover:text-white transition-colors">
                  Teknik Kadromuz
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">İletişim</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">İstanbul, Türkiye</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+90 (212) 123 45 67</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <span className="text-sm">info@beyazmarti.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Beyaz Martı Spor Kulübü. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
