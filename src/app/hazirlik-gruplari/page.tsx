import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { client, queries } from "@/lib/sanity";
import Image from "next/image";
import { Users, Target, Heart } from "lucide-react";

export const metadata = {
  title: "Hazırlık Grupları - Beyaz Martı Spor Kulübü",
  description: "Beyaz Martı Spor Kulübü hazırlık grupları. 6-14 yaş aralığında voleybol sporuna doğru adımlarla başlayın.",
};

// Revalidate every hour to get fresh data from Sanity
export const revalidate = 3600;

async function getHazirlikGrupResimler() {
  try {
    const resimler = await client.fetch(queries.hazirlikGrupuResimler, {}, {
      next: { tags: ['hazirlik-gruplari'] }
    });
    return resimler || [];
  } catch (error) {
    console.error('Error fetching hazirlik group images:', error);
    return [];
  }
}

export default async function HazirlikGruplariPage() {
  const resimler = await getHazirlikGrupResimler();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <PageHeader 
        title="Hazırlık Gruplarımız"
        subtitle="Beyaz Martı'nın Temeli"
        description="Büyük başarılar küçük yaşta atılan doğru adımlarla başlar"
      />

      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-xl font-semibold text-text">
                Hazırlık Gruplarımız – Beyaz Martı'nın Temeli
              </p>
              
              <p>
                Beyaz Martı Spor Kulübü'nde inanıyoruz ki büyük başarılar küçük yaşta atılan doğru adımlarla başlar.
                6–14 yaş aralığındaki çocuklarımız için oluşturduğumuz hazırlık grupları, voleybolun temellerinin atıldığı, karakterin şekillendiği ve özgüvenin güçlendiği özel bir eğitim alanıdır.
              </p>

              <p>
                Bu gruplarda sporcularımız, yaşlarına uygun antrenman programlarıyla motor becerilerini, koordinasyonlarını ve teknik gelişimlerini ilerletirken; disiplin, takım ruhu ve paylaşma kültürünü de öğrenirler.
                Bizim için her antrenman sadece bir çalışma değil, bir karakter gelişimi sürecidir.
              </p>

              <p>
                Beyaz Martı'nın hazırlık gruplarında yetişen her çocuk, sahada mücadele etmeyi, kazandığında mütevazı kalmayı, kaybettiğinde ise vazgeçmemeyi öğrenir.
              </p>

              <p>
                Hazırlık gruplarımız, <strong className="text-primary">"Zeki, çevik ve ahlaklı"</strong> sporcular yetiştirme hedefimizin ilk ve en önemli adımıdır.
                Burada atılan her adım, geleceğin başarılı, özgüvenli ve topluma örnek bireylerini yetiştirme yolculuğunun başlangıcıdır.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Gallery Section */}
      {resimler.length > 0 && (
        <Section className="bg-surface/5">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-text mb-4">
              Hazırlık Gruplarımızdan Kareler
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Sporcularımızın hazırlık süreçlerinden anlar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resimler.map((resim: any) => (
              <div 
                key={resim._id} 
                className="relative group overflow-hidden rounded-2xl bg-surface/10 hover:bg-surface/20 transition-all duration-300"
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={resim.image.asset.url}
                    alt={resim.image.alt || resim.title || 'Hazırlık grubu antrenmanı'}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                {resim.title && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-semibold">{resim.title}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      <SiteFooter />
    </div>
  );
}
