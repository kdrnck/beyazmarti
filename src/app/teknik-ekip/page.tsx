import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Award, Star } from "lucide-react";
import Image from "next/image";
import { client, queries } from "@/lib/sanity";

export const metadata = {
  title: "Teknik Ekip - Beyaz Martı Spor Kulübü",
  description: "Beyaz Martı Spor Kulübü teknik ekip üyeleri hakkında bilgi edinin.",
};

async function getStaff() {
  try {
    const staff = await client.fetch(queries.staff);
    return staff || [];
  } catch (error) {
    console.error('Error fetching staff:', error);
    return [];
  }
}

export default async function TeknikEkipPage() {
  const staff = await getStaff();

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staff.map((member: any) => (
              <Card key={member._id} className="bg-surface/10 border-surface/20 hover:bg-surface/20 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      {member.photo?.asset?.url ? (
                        <Image
                          src={member.photo.asset.url}
                          alt={member.photo.alt || member.name}
                          width={240}
                          height={240}
                          quality={90}
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          className="rounded-full object-cover border-4 border-primary/20"
                        />
                      ) : (
                        <div className="w-30 h-30 bg-gray-600 rounded-full flex items-center justify-center border-4 border-primary/20">
                          <Users className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-8 h-8 flex items-center justify-center">
                        <Award className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-white text-xl">{member.name}</CardTitle>
                  <div className="px-3 py-1 bg-gradient-to-r from-primary to-primary/80 text-white text-sm rounded-full font-semibold inline-block">
                    {member.role}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {member.bio && (
                    <p className="text-gray-300 text-sm leading-relaxed text-center">
                      {member.bio}
                    </p>
                  )}
                  
                  {member.experience && (
                    <div className="text-center">
                      <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-accent to-accent/80 text-white text-sm rounded-full font-medium">
                        <Star className="h-3 w-3 mr-1" />
                        {member.experience}
                      </div>
                    </div>
                  )}
                  
                  {member.certifications && member.certifications.length > 0 && (
                    <div className="text-center">
                      <h4 className="text-xs font-medium text-gray-400 mb-2">Sertifikalar</h4>
                      <div className="flex flex-wrap justify-center gap-1">
                        {member.certifications.map((cert: string, index: number) => (
                          <span key={index} className="px-2 py-1 bg-surface/20 text-gray-300 text-xs rounded">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
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
