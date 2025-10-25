import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Trophy } from "lucide-react";
import Image from "next/image";
import { client, queries } from "@/lib/sanity";

export const metadata = {
  title: "Maçlar - Beyaz Martı Spor Kulübü",
  description: "Beyaz Martı Spor Kulübü maç sonuçları ve programı.",
};

async function getMatches() {
  try {
    const matches = await client.fetch(queries.allMatches);
    return matches || [];
  } catch (error) {
    console.error('Error fetching matches:', error);
    return [];
  }
}

export default async function MaclarPage() {
  const matches = await getMatches();

  const getMatchResult = (match: any) => {
    return match.result || "0-0";
  };

  const getSetResults = (match: any) => {
    const sets = [match.set1, match.set2, match.set3];
    
    if (match.hasSet4 && match.set4) {
      sets.push(match.set4);
    }
    
    if (match.hasSet5 && match.set5) {
      sets.push(match.set5);
    }
    
    return sets;
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <PageHeader 
        title="Maçlar"
        subtitle="Sonuçlar ve Program"
        description="Beyaz Martı Spor Kulübü maç sonuçları ve yaklaşan karşılaşmalar."
      />

      <Section>
        {matches.length > 0 ? (
          <div className="space-y-6">
            {matches.map((match: any) => (
              <Card key={match._id} className="bg-surface/10 border-surface/20 hover:bg-surface/20 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    {/* Home Team */}
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        {match.homeTeam.logo?.asset?.url ? (
                          <Image
                            src={match.homeTeam.logo.asset.url}
                            alt={match.homeTeam.logo.alt || match.homeTeam.name}
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                        ) : (
                          <span className="text-primary font-bold">
                            {match.homeTeam.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-text">{match.homeTeam.name}</h3>
                        <p className="text-sm text-gray-400">Ev Sahibi</p>
                      </div>
                    </div>

                    {/* Match Info */}
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-400">
                          {new Date(match.date).toLocaleDateString("tr-TR")}
                        </span>
                      </div>
                      
                      <div className="text-2xl font-bold text-text mb-2">
                        {getMatchResult(match)}
                      </div>
                      
                      <div className="text-sm text-gray-300">
                        {getSetResults(match).map((set, index) => (
                          <span key={index} className="mr-2">
                            {set}
                          </span>
                        ))}
                      </div>

                      {match.venue && (
                        <div className="flex items-center justify-center mt-2">
                          <MapPin className="h-3 w-3 text-gray-400 mr-1" />
                          <span className="text-xs text-gray-400">{match.venue}</span>
                        </div>
                      )}
                    </div>

                    {/* Away Team */}
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-semibold text-text text-right">{match.awayTeam.name}</h3>
                        <p className="text-sm text-gray-400 text-right">Deplasman</p>
                      </div>
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        {match.awayTeam.logo?.asset?.url ? (
                          <Image
                            src={match.awayTeam.logo.asset.url}
                            alt={match.awayTeam.logo.alt || match.awayTeam.name}
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                        ) : (
                          <span className="text-primary font-bold">
                            {match.awayTeam.name.charAt(0)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-text mb-2">Henüz Maç Yok</h3>
            <p className="text-gray-400 mb-4">
              Maç sonuçları henüz yüklenmedi.
            </p>
            <p className="text-sm text-gray-500">
              Admin panelinden maç sonuçları yüklendikten sonra burada görünecek.
            </p>
          </div>
        )}
      </Section>

      <SiteFooter />
    </div>
  );
}
