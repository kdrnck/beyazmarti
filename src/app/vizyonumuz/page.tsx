import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";

export const metadata = {
  title: "Vizyonumuz - Beyaz Martı Spor Kulübü",
  description: "Beyaz Martı Spor Kulübü vizyonu ve gelecek hedefleri.",
};

export default function VizyonumuzPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <PageHeader 
        title="Vizyonumuz"
        subtitle="Gelecek Hedeflerimiz"
        description="Türkiye'nin önde gelen spor kulüplerinden biri olmak ve sporcularımızın ulusal ve uluslararası arenada başarılar elde etmelerini sağlamak."
      />

      <Section>
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-surface/10 rounded-2xl p-8">
            <h2 className="font-heading font-bold text-2xl text-text mb-6">
              Vizyonumuz
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Türkiye'nin önde gelen spor kulüplerinden biri olmak ve sporcularımızın 
              ulusal ve uluslararası arenada başarılar elde etmelerini sağlamak. 
              Spor kültürünü topluma yaymak ve spor sevgisini aşılamak.
            </p>
          </div>
        </div>
      </Section>

      <SiteFooter />
    </div>
  );
}
