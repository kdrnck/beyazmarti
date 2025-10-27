import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Crown } from "lucide-react";
import Image from "next/image";
import { client, queries, fetchWithRetry } from "@/lib/sanity";
import { BoardGrid } from "@/components/BoardGrid";

export const metadata = {
  title: "Yönetim Kurulu - Beyaz Martı Spor Kulübü",
  description: "Beyaz Martı Spor Kulübü yönetim kurulu üyeleri hakkında bilgi edinin.",
};

// Revalidate every 60 seconds to keep board members fresh
export const revalidate = 60;

async function getBoardMembers() {
  try {
    const members = await fetchWithRetry<any[]>(queries.boardMembers);
    return members || [];
  } catch (error) {
    console.error('Error fetching board members:', error);
    return [];
  }
}

export default async function YonetimKuruluPage() {
  const boardMembers = await getBoardMembers();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <PageHeader 
        title="Yönetim Kurulu"
        subtitle="Kulüp Yönetimi"
        description="Beyaz Martı Spor Kulübü'nü yöneten deneyimli ekibimiz."
      />

      <Section>
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl text-text mb-4">
            Yönetim Kurulu Üyelerimiz
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Kulübümüzün başarısında büyük payı olan yönetim kurulu üyelerimiz, 
            sporcularımızın gelişimi için çalışmaktadır.
          </p>
        </div>

        {boardMembers.length > 0 ? (
          <BoardGrid members={boardMembers} />
        ) : (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text mb-2">Yönetim Kurulu Bilgileri</h3>
            <p className="text-gray-400 mb-4">
              Yönetim kurulu üyelerimizin bilgileri henüz yüklenmedi.
            </p>
            <p className="text-sm text-gray-500">
              Admin panelinden yönetim kurulu üyeleri yüklendikten sonra burada görünecek.
            </p>
          </div>
        )}
      </Section>

      <SiteFooter />
    </div>
  );
}