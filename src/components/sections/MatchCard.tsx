import Image from "next/image";

interface TeamRef {
  name: string;
  logo?: { asset?: { url: string }, alt?: string };
}

interface MatchCardProps {
  date: string;
  venue?: string;
  homeTeam: TeamRef;
  awayTeam: TeamRef;
  result?: string;
  sets?: string[];
  variant?: 'compact' | 'default';
}

export function MatchCard({ date, venue, homeTeam, awayTeam, result, sets, variant = 'compact' }: MatchCardProps) {
  const wrapper = variant === 'compact'
    ? "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-xl p-5 border border-white/15 flex flex-col min-w-[280px]"
    : "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 flex flex-col";

  const logoSize = variant === 'compact' ? 28 : 32;

  return (
    <div className={wrapper}>
      {/* Üst: Logolar ve İsimler */}
      <div className="flex items-center justify-between">
        {/* Home */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-1">
            {homeTeam.logo?.asset?.url ? (
              <Image src={homeTeam.logo.asset.url} alt={homeTeam.logo.alt || homeTeam.name} width={logoSize} height={logoSize} className="rounded-full" />
            ) : (
              <span className="text-primary font-bold">{homeTeam.name.charAt(0)}</span>
            )}
          </div>
          <span className="text-white text-xs sm:text-sm font-semibold truncate max-w-[100px] sm:max-w-[140px] text-center">{homeTeam.name}</span>
        </div>

        {/* Middle */}
        <div className="text-center px-2 flex-1">
          {result ? (
            <div className="text-white font-bold text-xl mb-2">{result}</div>
          ) : null}
          <div className="text-[11px] text-gray-300">
            {new Date(date).toLocaleDateString('tr-TR')}
            {venue ? <span> • {venue}</span> : null}
          </div>
        </div>

        {/* Away */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-1">
            {awayTeam.logo?.asset?.url ? (
              <Image src={awayTeam.logo.asset.url} alt={awayTeam.logo.alt || awayTeam.name} width={logoSize} height={logoSize} className="rounded-full" />
            ) : (
              <span className="text-primary font-bold">{awayTeam.name.charAt(0)}</span>
            )}
          </div>
          <span className="text-white text-xs sm:text-sm font-semibold truncate max-w-[100px] sm:max-w-[140px] text-center">{awayTeam.name}</span>
        </div>
      </div>

      {/* Alt: Setler */}
      {sets && sets.length > 0 ? (
        <div className="mt-3 flex flex-row flex-wrap justify-center gap-1 text-[10px] text-gray-300">
          {sets.map((s, i) => (
            <span key={i} className="px-1.5 py-0.5 bg-white/10 rounded border border-white/10">{s}</span>
          ))}
        </div>
      ) : null}
    </div>
  );
}



