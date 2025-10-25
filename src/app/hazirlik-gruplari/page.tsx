import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Clock, Target } from "lucide-react";

export const metadata = {
  title: "Hazırlık Grupları - Beyaz Martı Spor Kulübü",
  description: "Beyaz Martı Spor Kulübü hazırlık grupları hakkında bilgi edinin. Voleybol sporuna başlamak için ideal ortam.",
};

export default function HazirlikGruplariPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <PageHeader 
        title="Hazırlık Grupları"
        subtitle="Voleybol Sporuna İlk Adım"
        description="Voleybol sporuna yeni başlayan gençlerimiz için özel hazırlık gruplarımız."
      />

      <Section>
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl text-text mb-4">
            Hazırlık Gruplarımız
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Voleybol sporuna yeni başlayan çocuklarımız için özel olarak tasarlanmış hazırlık gruplarımızda, 
            temel teknikleri öğrenirken aynı zamanda sporun keyfini çıkaracaklar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Grup 1 */}
          <Card className="bg-surface/10 border-surface/20 hover:bg-surface/20 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-text flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                6-8 Yaş Hazırlık Grubu
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-300">Pazartesi, Çarşamba</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-300">16:00 - 17:00</span>
              </div>
              <p className="text-sm text-gray-300">
                Temel motor beceriler, koordinasyon ve voleybol oyununun temellerini öğrenme.
              </p>
            </CardContent>
          </Card>

          {/* Grup 2 */}
          <Card className="bg-surface/10 border-surface/20 hover:bg-surface/20 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-text flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                9-11 Yaş Hazırlık Grubu
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-300">Salı, Perşembe</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-300">17:00 - 18:00</span>
              </div>
              <p className="text-sm text-gray-300">
                Temel voleybol teknikleri, pas, servis ve oyun kurallarını öğrenme.
              </p>
            </CardContent>
          </Card>

          {/* Grup 3 */}
          <Card className="bg-surface/10 border-surface/20 hover:bg-surface/20 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-text flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                12-14 Yaş Hazırlık Grubu
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-300">Cumartesi</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-300">10:00 - 12:00</span>
              </div>
              <p className="text-sm text-gray-300">
                Gelişmiş teknikler, takım oyunu ve müsabaka hazırlığı.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Program Detayları */}
        <Card className="bg-surface/10 border-surface/20">
          <CardHeader>
            <CardTitle className="text-text flex items-center">
              <Target className="h-5 w-5 mr-2 text-primary" />
              Program Detayları
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-text mb-4">Eğitim İçeriği</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Temel motor beceriler geliştirme</li>
                  <li>• Voleybol teknikleri (pas, servis, smaç)</li>
                  <li>• Koordinasyon ve denge çalışmaları</li>
                  <li>• Takım oyunu ve iletişim</li>
                  <li>• Fair-play ve spor ahlakı</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-text mb-4">Gereksinimler</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Spor kıyafetleri ve spor ayakkabı</li>
                  <li>• Su matarası</li>
                  <li>• Sağlık raporu (ilk kayıt için)</li>
                  <li>• Veli izin belgesi</li>
                  <li>• Motivasyon ve istek</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* CTA Section */}
      <Section className="bg-surface/5">
        <div className="text-center">
          <h2 className="font-heading font-bold text-3xl text-text mb-4">
            Hazırlık Grubumuza Katılmak İster misiniz?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Çocuğunuzun voleybol sporuna sağlam temellerle başlamasını istiyorsanız, 
            hazırlık gruplarımıza katılabilirsiniz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/iletisim"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              İletişime Geçin
            </a>
            <a
              href="/takimlarimiz"
              className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
            >
              Takımlarımızı İnceleyin
            </a>
          </div>
        </div>
      </Section>

      <SiteFooter />
    </div>
  );
}
