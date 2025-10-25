import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";

export const metadata = {
  title: "Hazırlık Gruplarımız - Beyaz Martı Spor Kulübü",
  description: "Beyaz Martı Spor Kulübü hazırlık grupları ve başlangıç seviyesi eğitimler.",
};

export default function HazirlikGruplarimizPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <PageHeader 
        title="Hazırlık Gruplarımız"
        subtitle="Başlangıç Seviyesi"
        description="Spora yeni başlayan gençlerimiz için özel hazırlık gruplarımız."
      />

      <Section>
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-surface/10 rounded-2xl p-8">
            <h2 className="font-heading font-bold text-2xl text-text mb-6">
              Hazırlık Gruplarımız
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Spora yeni başlayan gençlerimiz için özel olarak tasarlanmış hazırlık gruplarımızda, 
              temel spor becerilerini öğrenirken aynı zamanda spor sevgisini de kazanırlar.
            </p>
          </div>
        </div>
      </Section>

      <SiteFooter />
    </div>
  );
}
