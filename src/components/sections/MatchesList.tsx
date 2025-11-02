"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Calendar, MapPin, Trophy, Filter, Check, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Match {
  _id: string;
  date: string;
  status: string;
  venue?: string;
  team?: {
    _id: string;
    name: string;
    slug?: { current?: string };
  };
  homeTeam: {
    name: string;
    logo?: { asset?: { url: string }, alt?: string };
  };
  awayTeam: {
    name: string;
    logo?: { asset?: { url: string }, alt?: string };
  };
  result?: string;
  set1?: string;
  set2?: string;
  set3?: string;
  hasSet4?: boolean;
  set4?: string;
  hasSet5?: boolean;
  set5?: string;
}

interface Team {
  _id: string;
  name: string;
  slug?: { current?: string };
}

interface MatchesListProps {
  matches: Match[];
  teams: Team[];
}

export function MatchesList({ matches, teams }: MatchesListProps) {
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [mobileView, setMobileView] = useState<'past' | 'upcoming'>('past'); // Mobilde hangi görünüm aktif

  // Get unique teams from matches
  const availableTeams = useMemo(() => {
    const teamMap = new Map<string, Team>();
    matches.forEach(match => {
      if (match.team?._id && match.team?.name) {
        teamMap.set(match.team._id, {
          _id: match.team._id,
          name: match.team.name,
          slug: match.team.slug
        });
      }
    });
    return Array.from(teamMap.values());
  }, [matches]);

  // Filter matches
  const filteredMatches = useMemo(() => {
    if (selectedTeams.length === 0) {
      return matches;
    }
    return matches.filter(match => 
      match.team?._id && selectedTeams.includes(match.team._id)
    );
  }, [matches, selectedTeams]);

  const upcoming = filteredMatches.filter((m: Match) => m.status === 'upcoming');
  const past = filteredMatches.filter((m: Match) => m.status === 'past');

  const toggleTeam = (teamId: string) => {
    setSelectedTeams(prev => 
      prev.includes(teamId)
        ? prev.filter(id => id !== teamId)
        : [...prev, teamId]
    );
  };

  const clearFilters = () => {
    setSelectedTeams([]);
  };

  const applyFilters = () => {
    setIsFilterOpen(false);
  };

  const getMatchResult = (match: Match) => {
    return match.result || "0-0";
  };

  const getSetResults = (match: Match) => {
    const sets: string[] = [];
    if (match.set1) sets.push(match.set1);
    if (match.set2) sets.push(match.set2);
    if (match.set3) sets.push(match.set3);
    if (match.hasSet4 && match.set4) sets.push(match.set4);
    if (match.hasSet5 && match.set5) sets.push(match.set5);
    return sets;
  };

  const MatchCard = ({ match, isPast }: { match: Match; isPast: boolean }) => {
    const sets = isPast ? getSetResults(match) : [];
    return (
      <Card className="bg-surface/10 border-surface/20 hover:bg-surface/20 transition-all duration-300">
        <CardContent className="p-6">
          {match.team?.name && (
            <div className="mb-4 flex justify-start">
              <div className="px-2 py-1 bg-primary/20 border border-primary/30 rounded text-xs text-white font-semibold">
                {match.team.name}
              </div>
            </div>
          )}
          <div className="grid grid-cols-3 gap-4 items-center">
            {/* Home Team - Sol Bölüm */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
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
              <div className="min-w-0">
                <h3 className="font-semibold text-text truncate">{match.homeTeam.name}</h3>
                <p className="text-sm text-gray-400">Ev Sahibi</p>
              </div>
            </div>

            {/* Match Info - Orta Bölüm */}
            <div className="text-center flex flex-col items-center justify-center">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-400">
                  {new Date(match.date).toLocaleDateString("tr-TR")}
                </span>
              </div>
              
              {isPast && (
                <>
                  <div className="text-2xl font-bold text-text mb-2">
                    {getMatchResult(match)}
                  </div>
                  
                  {sets.length > 0 && (
                    <div className="flex flex-row flex-wrap justify-center items-center gap-1 text-sm text-gray-300 w-full">
                      {sets.map((set, index) => (
                        <span key={index} className="px-2 py-1 bg-white/10 rounded border border-white/10">
                          {set}
                        </span>
                      ))}
                    </div>
                  )}
                </>
              )}

              {match.venue && (
                <div className="flex items-center justify-center mt-2">
                  <MapPin className="h-3 w-3 text-gray-400 mr-1" />
                  <span className="text-xs text-gray-400">{match.venue}</span>
                </div>
              )}
            </div>

            {/* Away Team - Sağ Bölüm */}
            <div className="flex items-center space-x-4 justify-end">
              <div className="min-w-0 text-right">
                <h3 className="font-semibold text-text truncate">{match.awayTeam.name}</h3>
                <p className="text-sm text-gray-400">Deplasman</p>
              </div>
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
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
    );
  };

  return (
    <>
      {/* Filtre Butonu */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-heading font-bold text-2xl text-text">Maçlar</h2>
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtrele
              {selectedTeams.length > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-primary text-white text-xs rounded-full">
                  {selectedTeams.length}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-background border-surface/20">
            <SheetHeader>
              <SheetTitle className="text-text">Grup Filtrele</SheetTitle>
              <SheetDescription className="text-gray-400">
                İstediğiniz grupları seçerek maçları filtreleyin
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              {availableTeams.length > 0 ? (
                <>
                  <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                    {availableTeams.map((team) => (
                      <button
                        key={team._id}
                        onClick={() => toggleTeam(team._id)}
                        className={`w-full text-left p-3 rounded-lg border transition-all ${
                          selectedTeams.includes(team._id)
                            ? 'bg-primary/20 border-primary/50 text-text'
                            : 'bg-surface/10 border-surface/20 text-gray-300 hover:bg-surface/20'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{team.name}</span>
                          {selectedTeams.includes(team._id) && (
                            <Check className="h-5 w-5 text-primary" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-surface/20">
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      className="flex-1"
                      disabled={selectedTeams.length === 0}
                    >
                      Temizle
                    </Button>
                    <Button
                      onClick={applyFilters}
                      className="flex-1 bg-primary hover:bg-accent"
                    >
                      Tamam ({selectedTeams.length > 0 ? selectedTeams.length : 'Tümü'})
                    </Button>
                  </div>
                </>
              ) : (
                <p className="text-gray-400 text-center py-8">
                  Henüz grup bilgisi olan maç yok
                </p>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop: İki Sütun Layout */}
      <div className="hidden md:grid md:grid-cols-2 gap-8">
        {/* Sol Sütun: Gelecek Maçlar */}
        <div>
          <h2 className="font-heading font-bold text-2xl text-text mb-4">Gelecek Maçlar</h2>
          {upcoming && upcoming.length > 0 ? (
            <div className="space-y-6">
              {upcoming.map((match: Match) => (
                <MatchCard key={match._id} match={match} isPast={false} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              Henüz gelecek maç yok
            </div>
          )}
        </div>

        {/* Sağ Sütun: Geçmiş Maçlar */}
        <div>
          <h2 className="font-heading font-bold text-2xl text-text mb-4">Geçmiş Maçlar</h2>
          {past && past.length > 0 ? (
            <div className="space-y-6">
              {past.map((match: Match) => (
                <MatchCard key={match._id} match={match} isPast={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              Henüz geçmiş maç yok
            </div>
          )}
        </div>
      </div>

      {/* Mobil: Carousel Layout */}
      <div className="md:hidden">
        <div className="relative">
          {/* Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(${mobileView === 'past' ? '0%' : '-100%'})` }}
            >
              {/* Geçmiş Maçlar - Sol Panel */}
              <div className="min-w-full px-0">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-heading font-bold text-2xl text-text">Geçmiş Maçlar</h2>
                  {upcoming.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setMobileView('upcoming')}
                      className="gap-2"
                    >
                      Gelecek Maçlar
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                {past && past.length > 0 ? (
                  <div className="space-y-6">
                    {past.map((match: Match) => (
                      <MatchCard key={match._id} match={match} isPast={true} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Trophy className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-text mb-2">
                      {selectedTeams.length > 0 ? 'Seçilen Filtrelere Uygun Maç Yok' : 'Henüz Geçmiş Maç Yok'}
                    </h3>
                    <p className="text-gray-400 mb-4">
                      {selectedTeams.length > 0 
                        ? 'Seçtiğiniz gruplar için henüz maç kaydı yok.'
                        : 'Maç sonuçları henüz yüklenmedi.'
                      }
                    </p>
                  </div>
                )}
              </div>

              {/* Gelecek Maçlar - Sağ Panel */}
              <div className="min-w-full px-0">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-heading font-bold text-2xl text-text">Gelecek Maçlar</h2>
                  {past.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setMobileView('past')}
                      className="gap-2"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Geçmiş Maçlar
                    </Button>
                  )}
                </div>
                {upcoming && upcoming.length > 0 ? (
                  <div className="space-y-6">
                    {upcoming.map((match: Match) => (
                      <MatchCard key={match._id} match={match} isPast={false} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-text mb-2">
                      {selectedTeams.length > 0 ? 'Seçilen Filtrelere Uygun Maç Yok' : 'Henüz Gelecek Maç Yok'}
                    </h3>
                    <p className="text-gray-400 mb-4">
                      {selectedTeams.length > 0 
                        ? 'Seçtiğiniz gruplar için henüz maç kaydı yok.'
                        : 'Yaklaşan maçlar henüz yüklenmedi.'
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
