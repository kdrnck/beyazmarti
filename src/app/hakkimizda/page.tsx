import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";

export const metadata = {
  title: "Hakkımızda - Beyaz Martı Spor Kulübü",
  description: "Beyaz Martı Spor Kulübü hakkında detaylı bilgi edinin.",
};

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <PageHeader 
        title="Hakkımızda"
        subtitle="Beyaz Martı Spor Kulübü"
        description="Sporun gücüyle gençlerimizi geleceğe hazırlıyoruz."
      />

      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-invert max-w-none">
            <h2 className="font-heading font-bold text-2xl text-text mb-4">
              Kulübümüz Hakkında
            </h2>
            <p className="text-gray-300 mb-6">
              Beyaz Martı Spor Kulübü, 2014 yılında kurulmuş olup, gençlerin spor yoluyla 
              gelişimini desteklemeyi amaçlayan bir spor kulübüdür. Kulübümüz, futbol, 
              basketbol ve voleybol branşlarında faaliyet göstermektedir.
            </p>
            
            <h3 className="font-heading font-bold text-xl text-text mb-3">
              Değerlerimiz
            </h3>
            <ul className="text-gray-300 space-y-2 mb-6">
              <li>• Disiplin ve düzen</li>
              <li>• Takım ruhu ve dayanışma</li>
              <li>• Fair play ve centilmenlik</li>
              <li>• Sürekli gelişim ve öğrenme</li>
              <li>• Toplumsal sorumluluk</li>
            </ul>

            <h3 className="font-heading font-bold text-xl text-text mb-3">
              Hedeflerimiz
            </h3>
            <p className="text-gray-300">
              Sporcularımızın hem sportif hem de kişisel gelişimlerini destekleyerek, 
              onları geleceğe hazırlamak. Spor kültürünü yaygınlaştırmak ve topluma 
              örnek olacak bireyler yetiştirmek.
            </p>
          </div>
        </div>
      </Section>

      <SiteFooter />
    </div>
  );
}
