"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, Users, Target, Calendar } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
}

export function Hero({ latestMatch }: HeroProps) {
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background/95 to-background">
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
          <div className="text-center max-w-4xl mx-auto pt-16 md:pt-8">
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

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
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
          {latestMatch && latestMatch.homeTeam && latestMatch.awayTeam && (
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

          {/* Stats */}
          <div className="md:grid md:grid-cols-3 md:gap-8 md:max-w-3xl md:mx-auto">
            {/* Mobile Carousel */}
            <div 
              className="md:hidden overflow-x-auto pb-4"
              ref={scrollContainerRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="flex gap-4 px-4" style={{ width: 'max-content' }}>
                {/* Repeat cards for infinite loop */}
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="text-center flex-shrink-0">
                    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 mb-4 border border-white/20 shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105 w-64">
                      {index % 3 === 0 && (
                        <>
                          <div className="p-3 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full w-fit mx-auto mb-4">
                            <Trophy className="h-8 w-8 text-accent" />
                          </div>
                          <div className="font-heading font-bold text-4xl text-white mb-2">15+</div>
                          <div className="text-gray-300 font-medium">Şampiyonluk</div>
                        </>
                      )}
                      {index % 3 === 1 && (
                        <>
                          <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full w-fit mx-auto mb-4">
                            <Users className="h-8 w-8 text-primary" />
                          </div>
                          <div className="font-heading font-bold text-4xl text-white mb-2">200+</div>
                          <div className="text-gray-300 font-medium">Aktif Sporcu</div>
                        </>
                      )}
                      {index % 3 === 2 && (
                        <>
                          <div className="p-3 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full w-fit mx-auto mb-4">
                            <Target className="h-8 w-8 text-accent" />
                          </div>
                          <div className="font-heading font-bold text-4xl text-white mb-2">10+</div>
                          <div className="text-gray-300 font-medium">Yıllık Deneyim</div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Desktop Grid */}
            <div className="hidden md:block text-center">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 mb-4 border border-white/20 shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105">
                <div className="p-3 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full w-fit mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-accent" />
                </div>
                <div className="font-heading font-bold text-4xl text-white mb-2">15+</div>
                <div className="text-gray-300 font-medium">Şampiyonluk</div>
              </div>
            </div>
            <div className="hidden md:block text-center">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 mb-4 border border-white/20 shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105">
                <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full w-fit mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="font-heading font-bold text-4xl text-white mb-2">200+</div>
                <div className="text-gray-300 font-medium">Aktif Sporcu</div>
              </div>
            </div>
            <div className="hidden md:block text-center">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 mb-4 border border-white/20 shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105">
                <div className="p-3 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full w-fit mx-auto mb-4">
                  <Target className="h-8 w-8 text-accent" />
                </div>
                <div className="font-heading font-bold text-4xl text-white mb-2">10+</div>
                <div className="text-gray-300 font-medium">Yıllık Deneyim</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
