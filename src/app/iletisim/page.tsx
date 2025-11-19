"use client";

import dynamic from 'next/dynamic';
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

// Lazy load the footer as requested for better performance
const SiteFooter = dynamic(() => import("@/components/layout/SiteFooter").then(mod => mod.SiteFooter), {
  loading: () => <div className="h-20 w-full bg-surface/5 animate-pulse" />
});

export default function IletisimPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <PageHeader 
        title="İletişim"
        subtitle="Bizimle İletişime Geçin"
        description="Sorularınız, önerileriniz veya katılım talepleriniz için bizimle iletişime geçebilirsiniz."
      />

      <Section>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-bold text-3xl text-text mb-8 text-center">
            İletişim Bilgileri
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-surface/10 border-surface/20">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-8 w-8 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-text text-lg mb-2">Adres</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Bahçeköy Merkez, Orman Fakültesi No:2<br />
                      34473 Sarıyer/İstanbul
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-surface/10 border-surface/20">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <Phone className="h-8 w-8 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-text text-lg mb-2">Telefon</h3>
                    <a href="tel:+902129540873" className="text-primary text-lg hover:underline">0212 954 08 73</a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-surface/10 border-surface/20">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <Mail className="h-8 w-8 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-text text-lg mb-2">E-posta</h3>
                    <p className="text-gray-300 text-lg">beyazmarti2015@gmail.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-surface/10 border-surface/20">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <Clock className="h-8 w-8 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-text text-lg mb-2">Çalışma Saatleri</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Pazartesi - Cuma: 09:00 - 18:00<br />
                      Cumartesi: 09:00 - 15:00<br />
                      Pazar: Kapalı
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      <SiteFooter />
    </div>
  );
}
