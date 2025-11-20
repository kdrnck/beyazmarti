import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Trophy, Target, ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { client, queries } from "@/lib/sanity";
import { PlayersList } from "@/components/PlayersList";

export const metadata = {
  title: "Takım Detayı - Beyaz Martı Spor Kulübü",
  description: "Beyaz Martı Spor Kulübü takım detayları ve oyuncu profilleri.",
};

// Revalidate every 60 seconds to keep team details fresh
export const revalidate = 60;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getTeamBySlug(slug: string) {
  try {
    console.log('Looking for team with slug:', slug);
    const team = await client.fetch(queries.teamBySlug, { slug }, {
      next: { tags: ['teams', `team:${slug}`] }
    });
    console.log('Found team:', team);
    return team;
  } catch (error) {
    console.error('Error fetching team:', error);
    return null;
  }
}

async function getPlayersByTeam(teamSlug: string) {
  try {
    console.log('Fetching players for team slug:', teamSlug);
    const players = await client.fetch(queries.playersByTeam, { teamSlug }, {
      next: { tags: ['players', `team:${teamSlug}:players`] }
    });
    console.log('Players found:', players);
    return players || [];
  } catch (error) {
    console.error('Error fetching players:', error);
    return [];
  }
}

// Icon mapping for teams
const getTeamIcon = (level: string) => {
  switch (level) {
    case 'A':
      return Trophy;
    case 'B':
      return Target;
    default:
      return Users;
  }
};

export default async function TeamDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const team = await getTeamBySlug(slug);

  if (!team) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Takım Bulunamadı</h1>
          <p className="text-gray-300 mb-8">Aradığınız takım bulunamadı.</p>
          <Link href="/takimlarimiz" className="text-primary hover:text-primary-dark">
            ← Takımlarımıza Dön
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const players = await getPlayersByTeam(slug);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <PageHeader 
        title={team.name}
        subtitle={`${team.ageGroup}${team.level ? ` - ${team.level}` : ''}`}
        description={team.description}
      />

      <Section>
        <div className="mb-8">
          <Link 
            href="/takimlarimiz" 
            className="inline-flex items-center text-primary hover:text-primary-dark transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Tüm Takımlara Dön
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Takım Bilgileri */}
          <div className="lg:col-span-1">
            <Card className="bg-surface/10 border-surface/20">
              <CardHeader>
                <CardTitle className="text-text flex items-center">
                  {React.createElement(getTeamIcon(team.level), { className: "h-5 w-5 mr-2 text-primary" })}
                  Takım Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {team.teamImage?.asset?.url && (
                  <div className="space-y-3">
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                      <Image
                        src={team.teamImage.asset.url}
                        alt={team.teamImage.alt || `${team.name} takım resmi`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    {team.imageDescription && (
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {team.imageDescription}
                      </p>
                    )}
                  </div>
                )}
                {team.achievements && (
                  <div className="flex justify-between pt-4 border-t border-surface/20">
                    <span className="text-gray-400">Başarılar:</span>
                    <span className="text-text">{team.achievements}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Oyuncular */}
          <div className="lg:col-span-2">
            <PlayersList players={players} />
          </div>
        </div>
      </Section>

      <SiteFooter />
    </div>
  );
}