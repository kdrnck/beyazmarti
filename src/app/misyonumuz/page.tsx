import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";

export const metadata = {
  title: "Misyonumuz - Beyaz Martı Spor Kulübü",
  description: "Beyaz Martı Spor Kulübü misyonu ve değerleri.",
};

export default function MisyonumuzPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <PageHeader 
        title="Misyonumuz"
        subtitle="Değerlerimiz"
        description="Gençlerimizi spor yoluyla fiziksel, zihinsel ve sosyal gelişimlerini destekleyerek, onları geleceğe hazırlamak."
      />

      <Section>
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-surface/10 rounded-2xl p-8">
            <h2 className="font-heading font-bold text-2xl text-text mb-6">
              Misyonumuz
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Gençlerimizi spor yoluyla fiziksel, zihinsel ve sosyal gelişimlerini destekleyerek, 
              onları geleceğe hazırlamak. Disiplin, takım ruhu, saygı ve fair play değerlerini 
              benimseyen bireyler yetiştirmek.
            </p>
          </div>
        </div>
      </Section>

      <SiteFooter />
    </div>
  );
}
