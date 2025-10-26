import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Award, Star } from "lucide-react";
import Image from "next/image";
import { client, queries, fetchWithRetry } from "@/lib/sanity";
import { StaffGrid } from "@/components/StaffGrid";

export const metadata = {
  title: "Teknik Ekip - Beyaz Martı Spor Kulübü",
  description: "Beyaz Martı Spor Kulübü teknik ekip üyeleri hakkında bilgi edinin.",
};

async function getStaff() {
  try {
    const staff = await fetchWithRetry<any[]>(queries.staff);
    return staff || [];
  } catch (error) {
    console.error('Error fetching staff:', error);
    return [];
  }
}

export default async function TeknikEkipPage() {
  const staff = await getStaff();
  // Client modal state must be in a client component; keep page server and render details in cards. We'll use details link text only.

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <PageHeader 
        title="Teknik Ekip"
        subtitle="Antrenörlerimiz"
        description="Sporcularımızı geleceğe hazırlayan deneyimli teknik ekibimiz."
      />

      <Section>
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl text-text mb-4">
            Teknik Ekip Üyelerimiz
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Sporcularımızın teknik ve fiziksel gelişiminde büyük rol oynayan 
            deneyimli antrenörlerimiz ve teknik ekibimiz.
          </p>
        </div>

        {staff.length > 0 ? (
          <StaffGrid staff={staff} />
        ) : (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text mb-2">Teknik Ekip Bilgileri</h3>
            <p className="text-gray-400 mb-4">
              Teknik ekip üyelerimizin bilgileri henüz yüklenmedi.
            </p>
            <p className="text-sm text-gray-500">
              Admin panelinden teknik ekip üyeleri yüklendikten sonra burada görünecek.
            </p>
          </div>
        )}
      </Section>

      <SiteFooter />
    </div>
  );
}
