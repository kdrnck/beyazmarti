import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";

export const metadata = {
  title: "Yönetim Kurulu - Beyaz Martı Spor Kulübü",
  description: "Beyaz Martı Spor Kulübü yönetim kurulu üyeleri.",
};

export default function YonetimKuruluPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <PageHeader 
        title="Yönetim Kurulu"
        subtitle="Kulüp Yönetimi"
        description="Beyaz Martı Spor Kulübü yönetim kurulu üyeleri ve görevleri."
      />

      <Section>
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-surface/10 rounded-2xl p-8">
            <h2 className="font-heading font-bold text-2xl text-text mb-6">
              Yönetim Kurulu
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Kulübümüzün yönetimi, deneyimli ve alanında uzman kişilerden oluşan 
              yönetim kurulumuz tarafından gerçekleştirilmektedir. Detaylı bilgi 
              için iletişime geçebilirsiniz.
            </p>
          </div>
        </div>
      </Section>

      <SiteFooter />
    </div>
  );
}
