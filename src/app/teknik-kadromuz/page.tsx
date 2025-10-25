import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";

export const metadata = {
  title: "Teknik Kadromuz - Beyaz Martı Spor Kulübü",
  description: "Beyaz Martı Spor Kulübü teknik kadrosu ve antrenörlerimiz.",
};

export default function TeknikKadromuzPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <PageHeader 
        title="Teknik Kadromuz"
        subtitle="Antrenörlerimiz"
        description="Deneyimli ve uzman antrenörlerimizle sporcularımızı geleceğe hazırlıyoruz."
      />

      <Section>
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-surface/10 rounded-2xl p-8">
            <h2 className="font-heading font-bold text-2xl text-text mb-6">
              Teknik Kadromuz
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Kulübümüzde çalışan antrenörlerimiz, alanlarında uzman ve deneyimli kişilerdir. 
              Sporcularımızın gelişimini desteklemek için sürekli kendilerini geliştirmektedirler.
            </p>
          </div>
        </div>
      </Section>

      <SiteFooter />
    </div>
  );
}
