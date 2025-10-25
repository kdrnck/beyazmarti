import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { LatestPosts } from "@/components/sections/LatestPosts";
import { client, queries } from "@/lib/sanity";

async function getLatestMatch() {
  try {
    const match = await client.fetch(queries.latestMatch);
    return match;
  } catch (error) {
    console.error('Error fetching latest match:', error);
    return null;
  }
}

export default async function Home() {
  const latestMatch = await getLatestMatch();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero latestMatch={latestMatch} />
        <LatestPosts />
      </main>
      <SiteFooter />
    </div>
  );
}
