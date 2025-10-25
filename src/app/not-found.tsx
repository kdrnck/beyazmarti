import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Sayfa Bulunamadı - Beyaz Martı Spor Kulübü",
  description: "Aradığınız sayfa bulunamadı.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-8">
            <h1 className="font-heading font-bold text-6xl text-primary mb-4">404</h1>
            <h2 className="font-heading font-bold text-2xl text-text mb-4">
              Sayfa Bulunamadı
            </h2>
            <p className="text-gray-300 mb-8">
              Aradığınız sayfa mevcut değil veya taşınmış olabilir.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary-dark text-white">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Ana Sayfaya Dön
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-background">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Blog'a Git
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
