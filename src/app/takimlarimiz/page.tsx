import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Trophy, Target, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { client, queries } from "@/lib/sanity";

interface Team {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  description: string;
  ageGroup: string;
  level?: string;
  achievements?: string;
}

export const metadata = {
  title: "Takımlarımız - Beyaz Martı Spor Kulübü",
  description: "Beyaz Martı Spor Kulübü voleybol takımları hakkında bilgi edinin.",
};

async function getTeams() {
  try {
    const teams = await client.fetch(queries.teams);
    return teams || [];
  } catch (error) {
    console.error('Error fetching teams:', error);
    return [];
  }
}

export default async function TakimlarimizPage() {
  const teams = await getTeams();
  
  // Debug: Takım slug'larını kontrol et
  console.log('Teams data:', teams.map((team: Team) => ({ 
    name: team.name, 
    slug: team.slug, 
    id: team._id,
    description: team.description 
  })));

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <PageHeader 
        title="Takımlarımız"
        subtitle="Voleybol Branşı"
        description="Farklı yaş gruplarında faaliyet gösteren voleybol takımlarımız."
      />

      <Section>
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl text-text mb-4">
            Voleybol Takımlarımız
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Yaş gruplarına göre organize edilmiş voleybol takımlarımızla sporcularımızı geleceğe hazırlıyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teams && teams.map((team: Team, index: number) => {
            return (
              <Card key={team._id} className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 hover:from-white/20 hover:to-white/10 transition-all duration-300 hover:scale-105 group cursor-pointer h-full shadow-lg hover:shadow-xl">
                <Link href={`/takimlarimiz/${team.slug?.current || 'takim-bulunamadi'}`} className="h-full flex flex-col">
                  <CardHeader className="text-center pb-6">
                    <div className="flex justify-center mb-6">
                      <div className="shadow-xl group-hover:scale-110 transition-all duration-300">
                        <Image
                          src="/logo.png"
                          alt="Beyaz Martı Spor Kulübü"
                          width={64}
                          height={64}
                          className="w-16 h-16 object-contain"
                        />
                      </div>
                    </div>
                    <CardTitle className="text-text group-hover:text-accent transition-colors text-xl font-bold mb-3">
                      {team.name}
                    </CardTitle>
                    <p className="text-gray-300 text-base leading-relaxed">{team.description}</p>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between px-6">
                    <div className="space-y-6">
                      <div className="text-center">
                        <span className="text-sm font-semibold text-gray-300 block mb-3">Yaş Grubu</span>
                        <span className="px-4 py-2 bg-gradient-to-r from-primary to-primary/80 text-white text-base rounded-full font-bold shadow-md">
                          {team.ageGroup}
                        </span>
                      </div>
                      
                      {team.level && (
                        <div className="text-center">
                          <span className="text-sm font-semibold text-gray-300 block mb-3">Seviye</span>
                          <span className="px-4 py-2 bg-gradient-to-r from-accent to-accent/80 text-white text-base rounded-full font-bold shadow-md">
                            {team.level}
                          </span>
                        </div>
                      )}
                      
                      {team.achievements && (
                        <div className="text-center">
                          <span className="text-sm font-semibold text-gray-300 block mb-3">Başarılar</span>
                          <span className="px-4 py-2 bg-gradient-to-r from-primary/80 to-accent/80 text-white text-base rounded-full font-bold shadow-md">
                            {team.achievements}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-center pt-6 mt-auto">
                      <div className="flex items-center space-x-2 text-primary group-hover:text-accent transition-colors">
                        <span className="text-sm font-semibold">Detayları Gör</span>
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>
      </Section>

      <SiteFooter />
    </div>
  );
}
