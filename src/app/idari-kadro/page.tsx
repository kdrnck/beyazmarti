import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { Users } from "lucide-react";
import { queries, fetchWithRetry } from "@/lib/sanity";
import { ExecutiveBoardGrid } from "@/components/ExecutiveBoardGrid";

export const metadata = {
  title: "İdari Kadro - Beyaz Martı Spor Kulübü",
  description: "Beyaz Martı Spor Kulübü idari kadro üyeleri hakkında bilgi edinin.",
};

// Revalidate every 60 seconds to keep executive board members fresh
export const revalidate = 60;

async function getExecutiveBoardMembers() {
  try {
    const members = await fetchWithRetry<any[]>(queries.executiveBoardMembers, {}, 2, ['executiveBoardMembers']);
    return members || [];
  } catch (error) {
    console.error('Error fetching executive board members:', error);
    return [];
  }
}

export default async function IdariKadroPage() {
  const executiveBoardMembers = await getExecutiveBoardMembers();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <PageHeader 
        title="İdari Kadro"
        subtitle="İdari Ekibimiz"
        description="Beyaz Martı Spor Kulübü'nün operasyonel yönetiminden sorumlu ekibimiz."
      />

      <Section>
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl text-text mb-4">
            İdari Kadro Üyelerimiz
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Kulübümüzün günlük operasyonlarını yöneten ve organizasyonu sağlayan
            idari kadro üyelerimiz.
          </p>
        </div>

        {executiveBoardMembers.length > 0 ? (
          <ExecutiveBoardGrid members={executiveBoardMembers} />
        ) : (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text mb-2">İdari Kadro Bilgileri</h3>
            <p className="text-gray-400 mb-4">
              İdari kadro üyelerimizin bilgileri henüz yüklenmedi.
            </p>
            <p className="text-sm text-gray-500">
              Admin panelinden idari kadro üyeleri yüklendikten sonra burada görünecek.
            </p>
          </div>
        )}
      </Section>

      <SiteFooter />
    </div>
  );
}

