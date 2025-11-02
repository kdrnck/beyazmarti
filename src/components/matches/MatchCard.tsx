import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";

export type Match = {
  id: string;               // Sanity _id or slug
  slug?: string;
  date: string;             // ISO
  homeTeam: string;
  awayTeam: string;
  venue?: string;
  score?: string;           // e.g. "3–1" (only for past)
  coverUrl?: string;
  // Additional fields from Sanity
  homeTeamLogo?: { asset?: { url: string }, alt?: string };
  awayTeamLogo?: { asset?: { url: string }, alt?: string };
  team?: {
    _id: string;
    name: string;
  };
  sets?: string[];
};

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  const formattedDate = new Intl.DateTimeFormat('tr-TR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(match.date));

  const cardContent = (
    <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-xl border border-white/15 hover:border-primary/30 transition-all duration-300">
      <CardContent className="p-5">
        {/* Grup/Takım Bilgisi */}
        {match.team?.name && (
          <div className="mb-3 flex justify-center">
            <div className="px-2 py-1 bg-primary/20 border border-primary/30 rounded text-xs text-white font-semibold">
              {match.team.name}
            </div>
          </div>
        )}

        {/* Teams Line */}
        <div className="mb-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              {match.homeTeamLogo?.asset?.url ? (
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Image
                    src={match.homeTeamLogo.asset.url}
                    alt={match.homeTeamLogo.alt || match.homeTeam}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                </div>
              ) : (
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold text-xs">
                    {match.homeTeam.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <span className="font-bold text-text truncate text-sm sm:text-base">{match.homeTeam}</span>
            </div>

            {match.score && (
              <div className="px-3 py-1 bg-accent/20 border border-accent/30 rounded-full text-accent font-bold text-lg flex-shrink-0">
                {match.score}
              </div>
            )}

            <div className="flex items-center gap-2 min-w-0 flex-1 justify-end">
              <span className="font-bold text-text truncate text-sm sm:text-base">{match.awayTeam}</span>
              {match.awayTeamLogo?.asset?.url ? (
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Image
                    src={match.awayTeamLogo.asset.url}
                    alt={match.awayTeamLogo.alt || match.awayTeam}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                </div>
              ) : (
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold text-xs">
                    {match.awayTeam.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
          <Calendar className="h-4 w-4" />
          <span>{formattedDate}</span>
        </div>

        {/* Venue */}
        {match.venue && (
          <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
            <MapPin className="h-3 w-3" />
            <span>{match.venue}</span>
          </div>
        )}

        {/* Sets (for past matches) */}
        {match.sets && match.sets.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/10">
            {match.sets.map((set, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-white/10 rounded border border-white/10 text-xs text-gray-300"
              >
                {set}
              </span>
            ))}
          </div>
        )}

        {/* Cover Image */}
        {match.coverUrl && (
          <div className="mt-3 relative h-32 rounded-lg overflow-hidden">
            <Image
              src={match.coverUrl}
              alt={`${match.homeTeam} vs ${match.awayTeam}`}
              fill
              className="object-cover"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );

  // Wrap in Link if slug is provided
  if (match.slug) {
    return (
      <Link href={`/maclar/${match.slug}`} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

