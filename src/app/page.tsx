import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { MatchCard } from "@/components/sections/MatchCard";
import { LatestPosts } from "@/components/sections/LatestPosts";
import { HomePopup } from "@/components/sections/HomePopup";
import { client, queries, fetchWithRetry } from "@/lib/sanity";

// Cache for 10 minutes, revalidate via webhook when content changes
export const revalidate = 600;

async function getLatestMatch() {
  try {
    const match = await fetchWithRetry<any>(queries.latestMatch, {}, 2, ['matches', 'home']);
    return match;
  } catch (error) {
    console.error('Error fetching latest match:', error);
    return null;
  }
}

async function getHomepageMatches() {
  try {
    const [upcoming, past] = await Promise.all([
      fetchWithRetry<any[]>(queries.homepageUpcomingMatches, {}, 2, ['matches', 'home']),
      fetchWithRetry<any[]>(queries.homepagePastMatches, {}, 2, ['matches', 'home'])
    ])
    return { upcoming: upcoming || [], past: past || [] }
  } catch (error) {
    console.error('Error fetching homepage matches:', error)
    return { upcoming: [], past: [] }
  }
}

export default async function Home() {
  const latestMatch = await getLatestMatch();
  const { upcoming, past } = await getHomepageMatches();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <HomePopup />
      <main>
        <div className="relative bg-[url('/bmBGIMG.svg')] bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/90 to-background pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-background/80 to-background pointer-events-none" />
          <div className="relative z-10">
            {/* Başlık/Hero */}
            <Hero latestMatch={latestMatch} showLatestMatch={false} />

            {/* Maçlar Bölümü */}
            <section className="py-6">
              <div className="container mx-auto px-4">
                {past.length > 0 && (
                  <div className="mb-8">
                    <a href="/maclar" className="inline-flex items-center gap-2 group">
                      <h2 className="font-heading font-bold text-2xl text-text mb-4 group-hover:text-accent transition-colors">Geçmiş Maçlar →</h2>
                    </a>
                    <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible pb-2 -mx-4 px-4 md:mx-0 md:px-0">
                      {past.map((match: any) => (
                        <div key={match._id} className="min-w-[280px] shrink-0 md:min-w-0">
                          <MatchCard
                            variant="compact"
                            date={match.date}
                            venue={match.venue}
                            homeTeam={match.homeTeam}
                            awayTeam={match.awayTeam}
                            team={match.team}
                            result={match.result}
                            sets={[match.set1, match.set2, match.set3, match.hasSet4 ? match.set4 : null, match.hasSet5 ? match.set5 : null].filter(Boolean)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {upcoming.length > 0 && (
                  <div className="mb-4">
                    <a href="/maclar" className="inline-flex items-center gap-2 group">
                      <h2 className="font-heading font-bold text-2xl text-text mb-4 group-hover:text-accent transition-colors">Gelecek Maçlar →</h2>
                    </a>
                    <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible pb-2 -mx-4 px-4 md:mx-0 md:px-0">
                      {upcoming.map((match: any) => (
                        <div key={match._id} className="min-w-[280px] shrink-0 md:min-w-0">
                          <MatchCard
                            variant="compact"
                            date={match.date}
                            venue={match.venue}
                            homeTeam={match.homeTeam}
                            awayTeam={match.awayTeam}
                            team={match.team}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>

        <LatestPosts />
      </main>
      <SiteFooter />
    </div>
  );
}
