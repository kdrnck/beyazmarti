import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Trophy, Filter } from "lucide-react";
import Image from "next/image";
import { client, queries, fetchWithRetry } from "@/lib/sanity";
import { MatchesList } from "@/components/sections/MatchesList";

export const metadata = {
  title: "Maçlar - Beyaz Martı Spor Kulübü",
  description: "Beyaz Martı Spor Kulübü maç sonuçları ve programı.",
};

// Revalidate to keep matches fresh
export const revalidate = 600;

async function getMatches() {
  try {
    const matches = await fetchWithRetry<any[]>(queries.allMatches, {}, 2, ['matches']);
    return matches || [];
  } catch (error) {
    console.error('Error fetching matches:', error);
    return [];
  }
}

async function getTeams() {
  try {
    const teams = await fetchWithRetry<any[]>(queries.teams, {}, 2, ['teams']);
    return teams || [];
  } catch (error) {
    console.error('Error fetching teams:', error);
    return [];
  }
}

export default async function MaclarPage() {
  const matches = await getMatches();
  const teams = await getTeams();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <PageHeader 
        title="Maçlar"
        subtitle="Sonuçlar ve Program"
        description="Beyaz Martı Spor Kulübü maç sonuçları ve yaklaşan karşılaşmalar."
      />

      <Section>
        <MatchesList matches={matches} teams={teams} />
      </Section>

      <SiteFooter />
    </div>
  );
}
