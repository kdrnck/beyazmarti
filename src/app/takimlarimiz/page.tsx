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

// Revalidate every 60 seconds to keep teams fresh
export const revalidate = 60;

async function getTeams() {
  try {
    const teams = await client.fetch(queries.teams, {}, {
      next: { tags: ['teams'] }
    });
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

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          {teams && teams.map((team: Team, index: number) => {
            return (
              <Card key={team._id} className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 hover:from-white/20 hover:to-white/10 transition-all duration-300 hover:scale-105 group cursor-pointer h-full shadow-lg hover:shadow-xl">
                <Link href={`/takimlarimiz/${team.slug?.current || 'takim-bulunamadi'}`} className="h-full flex flex-col">
                  <CardHeader className="text-center pb-4 lg:pb-6 px-3 lg:px-6">
                    <div className="flex justify-center mb-4 lg:mb-6">
                      <div className="shadow-xl group-hover:scale-110 transition-all duration-300">
                        <Image
                          src="/logo.png"
                          alt="Beyaz Martı Spor Kulübü"
                          width={64}
                          height={64}
                          className="w-12 h-12 lg:w-16 lg:h-16 object-contain"
                        />
                      </div>
                    </div>
                    <CardTitle className="text-text group-hover:text-accent transition-colors text-base lg:text-xl font-bold mb-2 lg:mb-3 break-words line-clamp-2">
                      {team.name}
                    </CardTitle>
                    <p className="text-gray-300 text-sm lg:text-base leading-relaxed break-words line-clamp-3">{team.description}</p>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between px-3 lg:px-6 pb-4 lg:pb-6">
                    <div className="space-y-4 lg:space-y-6">
                      <div className="text-center">
                        <span className="text-xs lg:text-sm font-semibold text-gray-300 block mb-2 lg:mb-3">Yaş Grubu</span>
                        <span className="px-2 lg:px-4 py-1.5 lg:py-2 bg-gradient-to-r from-primary to-primary/80 text-white text-xs lg:text-base rounded-full font-bold shadow-md break-words">
                          {team.ageGroup}
                        </span>
                      </div>
                      
                      {team.level && (
                        <div className="text-center">
                          <span className="text-xs lg:text-sm font-semibold text-gray-300 block mb-2 lg:mb-3">Seviye</span>
                          <span className="px-2 lg:px-4 py-1.5 lg:py-2 bg-gradient-to-r from-accent to-accent/80 text-white text-xs lg:text-base rounded-full font-bold shadow-md break-words">
                            {team.level}
                          </span>
                        </div>
                      )}
                      
                      {team.achievements && (
                        <div className="text-center">
                          <span className="text-xs lg:text-sm font-semibold text-gray-300 block mb-2 lg:mb-3">Başarılar</span>
                          <span className="px-2 lg:px-4 py-1.5 lg:py-2 bg-gradient-to-r from-primary/80 to-accent/80 text-white text-xs lg:text-base rounded-full font-bold shadow-md break-words line-clamp-2">
                            {team.achievements}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-center pt-4 lg:pt-6 mt-auto">
                      <div className="flex items-center space-x-1 lg:space-x-2 text-primary group-hover:text-accent transition-colors">
                        <span className="text-xs lg:text-sm font-semibold">Detayları Gör</span>
                        <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5 group-hover:translate-x-1 transition-transform" />
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
