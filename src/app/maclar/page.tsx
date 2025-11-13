import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { client, queries, fetchWithRetry } from "@/lib/sanity";
import { MatchesSwiper } from "@/components/matches/MatchesSwiper";
import { Match } from "@/components/matches/MatchCard";

export const metadata = {
  title: "Maçlar - Beyaz Martı Spor Kulübü",
  description: "Beyaz Martı Spor Kulübü maç sonuçları ve programı.",
};

// Cache for 10 minutes, revalidate via webhook when matches change
export const revalidate = 600;

// Helper function to get set results
function getSetResults(match: any): string[] {
  const sets: string[] = [];
  if (match.set1) sets.push(match.set1);
  if (match.set2) sets.push(match.set2);
  if (match.set3) sets.push(match.set3);
  if (match.hasSet4 && match.set4) sets.push(match.set4);
  if (match.hasSet5 && match.set5) sets.push(match.set5);
  return sets;
}

// Transform Sanity match data to Match type
function transformMatch(sanityMatch: any): Match {
  const sets = getSetResults(sanityMatch);
  
  return {
    id: sanityMatch._id,
    slug: sanityMatch.slug?.current,
    date: sanityMatch.date,
    homeTeam: sanityMatch.homeTeam?.name || '',
    awayTeam: sanityMatch.awayTeam?.name || '',
    venue: sanityMatch.venue,
    score: sanityMatch.result || undefined,
    homeTeamLogo: sanityMatch.homeTeam?.logo,
    awayTeamLogo: sanityMatch.awayTeam?.logo,
    team: sanityMatch.team ? {
      _id: sanityMatch.team._id,
      name: sanityMatch.team.name,
    } : undefined,
    sets: sets.length > 0 ? sets : undefined,
  };
}

async function getMatches() {
  try {
    // TODO: Replace with optimized GROQ queries for upcoming/past separation
    // Upcoming: *[_type=="match" && dateTime(date) >= now()] | order(date asc) { ... }
    // Past:     *[_type=="match" && dateTime(date) < now()] | order(date desc) { ... }
    // Add { next: { tags: ['matches'] } } to both fetches for ISR
    const matches = await fetchWithRetry<any[]>(queries.allMatches, {}, 2, ['matches']);
    return matches || [];
  } catch (error) {
    console.error('Error fetching matches:', error);
    return [];
  }
}

export default async function MaclarPage() {
  const sanityMatches = await getMatches();
  
  // Transform and separate matches
  const allMatches = sanityMatches.map(transformMatch);
  const upcoming = allMatches.filter(m => {
    // If status is explicitly set, use it; otherwise infer from date
    const match = sanityMatches.find(sm => sm._id === m.id);
    if (match?.status === 'upcoming') return true;
    if (match?.status === 'past') return false;
    // Fallback: compare date with now
    return new Date(m.date) >= new Date();
  });
  const past = allMatches.filter(m => {
    const match = sanityMatches.find(sm => sm._id === m.id);
    if (match?.status === 'past') return true;
    if (match?.status === 'upcoming') return false;
    // Fallback: compare date with now
    return new Date(m.date) < new Date();
  });

  // Sort: upcoming ascending, past descending
  upcoming.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  past.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <PageHeader 
        title="Maçlar"
        subtitle="Sonuçlar ve Program"
        description="Beyaz Martı Spor Kulübü maç sonuçları ve yaklaşan karşılaşmalar."
      />

      <Section>
        <MatchesSwiper 
          upcoming={upcoming} 
          past={past} 
          initialTab="upcoming"
        />
      </Section>

      <SiteFooter />
    </div>
  );
}
