import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Trophy, Target } from "lucide-react";

export const metadata = {
  title: "Takımlarımız - Beyaz Martı Spor Kulübü",
  description: "Beyaz Martı Spor Kulübü takımları ve branşları hakkında bilgi edinin.",
};

const teams = [
  {
    name: "Futbol Takımı",
    description: "Genç yeteneklerimizle büyük hedeflerimiz var. Disiplinli antrenmanlar ve takım ruhu ile başarıya odaklanıyoruz.",
    ageGroups: ["U-8", "U-10", "U-12", "U-14", "U-16", "U-18"],
    achievements: "15 Şampiyonluk",
    icon: Trophy,
  },
  {
    name: "Basketbol Takımı",
    description: "Hızlı tempolu oyunlar ve stratejik yaklaşımlarla sporcularımızı geliştiriyoruz.",
    ageGroups: ["U-10", "U-12", "U-14", "U-16", "U-18"],
    achievements: "8 Şampiyonluk",
    icon: Target,
  },
  {
    name: "Voleybol Takımı",
    description: "Takım çalışması ve teknik becerilerin geliştirilmesi odaklı antrenman programlarımız.",
    ageGroups: ["U-12", "U-14", "U-16", "U-18"],
    achievements: "12 Şampiyonluk",
    icon: Users,
  },
];

export default function TakimlarimizPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <PageHeader 
        title="Takımlarımız"
        subtitle="Branşlarımız"
        description="Futbol, basketbol ve voleybol branşlarında faaliyet gösteren takımlarımız."
      />

      <Section>
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl text-text mb-4">
            Branşlarımız
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Farklı yaş gruplarında faaliyet gösteren takımlarımızla sporcularımızı geleceğe hazırlıyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teams.map((team, index) => (
            <Card key={index} className="bg-surface/10 border-surface/20 hover:bg-surface/20 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <team.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-text">{team.name}</CardTitle>
                </div>
                <p className="text-gray-300">{team.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-text mb-2">Yaş Grupları</h4>
                    <div className="flex flex-wrap gap-2">
                      {team.ageGroups.map((ageGroup) => (
                        <span 
                          key={ageGroup}
                          className="px-2 py-1 bg-primary/20 text-primary text-sm rounded-full"
                        >
                          {ageGroup}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-text mb-2">Başarılar</h4>
                    <p className="text-gray-300">{team.achievements}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-surface/5">
        <div className="text-center">
          <h2 className="font-heading font-bold text-3xl text-text mb-4">
            Takımlarımıza Katılmak İster misiniz?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Sporcularımızın gelişimini destekleyen profesyonel antrenörlerimizle 
            birlikte çalışmak için bizimle iletişime geçin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/iletisim"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              İletişime Geçin
            </a>
            <a 
              href="/hazirlik-gruplarimiz"
              className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
            >
              Hazırlık Grupları
            </a>
          </div>
        </div>
      </Section>

      <SiteFooter />
    </div>
  );
}
