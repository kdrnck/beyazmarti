import Image from "next/image";

interface TeamRef {
  name: string;
  logo?: { asset?: { url: string }, alt?: string };
}

interface MatchTeam {
  _id?: string;
  name?: string;
  slug?: { current?: string };
}

interface MatchCardProps {
  date: string;
  venue?: string;
  homeTeam: TeamRef;
  awayTeam: TeamRef;
  team?: MatchTeam;
  result?: string;
  sets?: string[];
  variant?: 'compact' | 'default';
}

export function MatchCard({ date, venue, homeTeam, awayTeam, team, result, sets, variant = 'compact' }: MatchCardProps) {
  const wrapper = variant === 'compact'
    ? "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/15 flex flex-col w-full"
    : "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 flex flex-col";

  const logoSize = variant === 'compact' ? 24 : 32;

  return (
    <div className={wrapper}>
      {/* Grup/Takım Bilgisi */}
      {team?.name && (
        <div className="mb-2 flex justify-center">
          <div className="max-w-full px-2 py-1 bg-primary/20 border border-primary/30 rounded text-[10px] sm:text-xs text-white font-semibold flex items-center justify-center">
            <span className="truncate">{team.name}</span>
          </div>
        </div>
      )}

      {/* Üst: Logolar ve İsimler */}
      <div className="grid grid-cols-3 gap-1 sm:gap-2 items-center">
        {/* Home - Sol Bölüm */}
        <div className="flex flex-col items-center min-w-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-full flex items-center justify-center mb-1 flex-shrink-0">
            {homeTeam.logo?.asset?.url ? (
              <Image src={homeTeam.logo.asset.url} alt={homeTeam.logo.alt || homeTeam.name} width={logoSize} height={logoSize} className="rounded-full" />
            ) : (
              <span className="text-primary font-bold text-sm">{homeTeam.name.charAt(0)}</span>
            )}
          </div>
          <span className="text-white text-[10px] sm:text-xs font-semibold text-center leading-tight break-words w-full px-1">
            {homeTeam.name}
          </span>
        </div>

        {/* Middle - Orta Bölüm */}
        <div className="text-center px-1 flex flex-col items-center justify-center min-w-0">
          {result ? (
            <div className="text-white font-bold text-lg sm:text-xl mb-1">{result}</div>
          ) : null}
          <div className="text-[9px] sm:text-[11px] text-gray-300 leading-tight">
            <div>{new Date(date).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit' })}</div>
            {venue && <div className="truncate max-w-[80px] sm:max-w-none">{venue}</div>}
          </div>
        </div>

        {/* Away - Sağ Bölüm */}
        <div className="flex flex-col items-center min-w-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-full flex items-center justify-center mb-1 flex-shrink-0">
            {awayTeam.logo?.asset?.url ? (
              <Image src={awayTeam.logo.asset.url} alt={awayTeam.logo.alt || awayTeam.name} width={logoSize} height={logoSize} className="rounded-full" />
            ) : (
              <span className="text-primary font-bold text-sm">{awayTeam.name.charAt(0)}</span>
            )}
          </div>
          <span className="text-white text-[10px] sm:text-xs font-semibold text-center leading-tight break-words w-full px-1">
            {awayTeam.name}
          </span>
        </div>
      </div>

      {/* Alt: Setler */}
      {sets && sets.length > 0 ? (
        <div className="mt-2 w-full">
          <div className="flex flex-row flex-wrap justify-center items-center gap-1 text-[9px] sm:text-[10px] text-gray-300">
            {sets.map((s, i) => (
              <span key={i} className="px-1.5 py-0.5 bg-white/10 rounded border border-white/10 whitespace-nowrap">{s}</span>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
