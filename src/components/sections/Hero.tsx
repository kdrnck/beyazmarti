"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, Users, Target, Calendar, Heart } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { client, queries, fetchWithRetry } from "@/lib/sanity";

interface Match {
  _id: string;
  date: string;
  homeTeam: {
    name: string;
    logo?: {
      asset?: {
        url: string;
      };
      alt?: string;
    };
  };
  awayTeam: {
    name: string;
    logo?: {
      asset?: {
        url: string;
      };
      alt?: string;
    };
  };
  result: string;
  set1: string;
  set2: string;
  set3: string;
  hasSet4?: boolean;
  set4?: string;
  hasSet5?: boolean;
  set5?: string;
}

interface HeroProps {
  latestMatch: Match | null;
  showLatestMatch?: boolean;
}

export function Hero({ latestMatch, showLatestMatch = true }: HeroProps) {
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPaused) return;

    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
    };

    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleTouchStart = () => {
    setIsPaused(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => setIsPaused(false), 2000);
  };

  // Stats component fetching from Sanity
  async function getStats() {
    try {
      const [stats, teamsCount] = await Promise.all([
        fetchWithRetry<any>(queries.clubStats),
        fetchWithRetry<any>(queries.teamsCount)
      ]);
      return { ...(stats || {}), teamsCount: teamsCount || 0 };
    } catch {
      return { championships: 0, activeAthletes: 0, experienceYears: 0, teamsCount: 0 };
    }
  }

  function HeroStatsInner({ data }: { data: any }) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 md:max-w-4xl md:mx-auto mt-4">
        <div className="text-center bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="p-3 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full w-fit mx-auto mb-3">
            <Trophy className="h-7 w-7 text-accent" />
          </div>
          <div className="font-heading font-bold text-3xl text-white mb-1">{data?.championships ?? 0}+</div>
          <div className="text-gray-300 text-sm">Şampiyonluk</div>
        </div>
        <div className="text-center bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full w-fit mx-auto mb-3">
            <Users className="h-7 w-7 text-primary" />
          </div>
          <div className="font-heading font-bold text-3xl text-white mb-1">{data?.activeAthletes ?? 0}+</div>
          <div className="text-gray-300 text-sm">Aktif Sporcu</div>
        </div>
        <div className="text-center bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="p-3 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full w-fit mx-auto mb-3">
            <Target className="h-7 w-7 text-accent" />
          </div>
          <div className="font-heading font-bold text-3xl text-white mb-1">{data?.experienceYears ?? 0}+</div>
          <div className="text-gray-300 text-sm">Yıllık Deneyim</div>
        </div>
      </div>
    )
  }

  function HeroStats() {
    const [data, setData] = useState<any | null>(null);
    useEffect(() => {
      getStats().then(setData);
    }, []);
    if (!data) return null;
    return <HeroStatsInner data={data} />
  }

  const getMatchResult = (match: Match) => {
    if (!match) return "0-0";
    return match.result || "0-0";
  };

  const getSetResults = (match: Match) => {
    if (!match) return "";
    
    const sets = [match.set1, match.set2, match.set3];
    
    if (match.hasSet4 && match.set4) {
      sets.push(match.set4);
    }
    
    if (match.hasSet5 && match.set5) {
      sets.push(match.set5);
    }
    
    return sets.join(', ');
  };

  const getSetResultsArray = (match: Match) => {
    if (!match) return [];
    
    const sets: string[] = [];
    
    if (match.set1) {
      sets.push(match.set1);
    }
    
    if (match.set2) {
      sets.push(match.set2);
    }
    
    if (match.set3) {
      sets.push(match.set3);
    }
    
    if (match.hasSet4 && match.set4) {
      sets.push(match.set4);
    }
    
    if (match.hasSet5 && match.set5) {
      sets.push(match.set5);
    }
    
    return sets;
  };

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background/95 to-background">
      {/* Elegant Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      {/* Geometric Shapes */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-accent/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-primary/15 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-1/4 w-16 h-16 bg-accent/15 rounded-full blur-lg"></div>
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto pt-6 md:pt-4">
            <div>
              <h1 className="font-heading font-bold text-5xl md:text-7xl text-white mb-6">
                Beyaz Martı
                <span className="block bg-gradient-to-r from-primary via-primary/80 to-white bg-clip-text text-transparent">
                  Spor Kulübü
                </span>
              </h1>
            </div>

             <p className="text-xl md:text-2xl text-white mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
               Zeki - Çevik - Ahlaklı
             </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button asChild size="lg" className="bg-primary hover:bg-accent text-white">
                <Link href="/kulup-hakkinda">
                  Kulübümüzü Keşfedin
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-accent hover:border-accent">
                <Link href="/takimlarimiz">
                  Takımlarımız
                </Link>
              </Button>
            </div>

          {/* Latest Match Section */}
          {showLatestMatch && latestMatch && latestMatch.homeTeam && latestMatch.awayTeam && (
            <div className="mb-12">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl hover:shadow-primary/20 transition-all duration-300">
                <div className="flex items-center justify-between">
                  {/* Home Team */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-2">
                      {latestMatch.homeTeam.logo?.asset?.url ? (
                        <Image
                          src={latestMatch.homeTeam.logo.asset.url}
                          alt={latestMatch.homeTeam.logo.alt || latestMatch.homeTeam.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      ) : (
                        <span className="text-primary font-bold text-lg">
                          {latestMatch.homeTeam.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <span className="text-white font-semibold">{latestMatch.homeTeam.name}</span>
                  </div>

                  {/* Match Result */}
                  <div className="text-center">
                    <Calendar className="h-5 w-5 text-white mx-auto mb-1" />
                    <div className="text-white font-semibold mb-2">Son Maç</div>
                    <div className="text-3xl font-bold text-white mb-4">
                      {getMatchResult(latestMatch)}
                    </div>
                    
                    {/* Set Results */}
                    <div className="flex flex-wrap justify-center gap-2">
                      {getSetResultsArray(latestMatch).map((set, index) => (
                        <div
                          key={index}
                          className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1 border border-white/20"
                        >
                          <span className="text-xs text-gray-300">
                            {index + 1}. Set:
                          </span>
                          <span className="text-sm font-semibold text-white ml-1">
                            {set}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Away Team */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-2">
                      {latestMatch.awayTeam.logo?.asset?.url ? (
                        <Image
                          src={latestMatch.awayTeam.logo.asset.url}
                          alt={latestMatch.awayTeam.logo.alt || latestMatch.awayTeam.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      ) : (
                        <span className="text-primary font-bold text-lg">
                          {latestMatch.awayTeam.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <span className="text-white font-semibold">{latestMatch.awayTeam.name}</span>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <Button asChild variant="ghost" className="text-white hover:text-accent">
                    <Link href="/maclar">
                      Tüm Maçları Gör
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Stats (from Sanity) */}
          <HeroStats />
        </div>
      </div>
    </section>
  );
}
