import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { Trophy, Target, Users, Heart } from "lucide-react";
import { client, queries } from "@/lib/sanity";
import Image from "next/image";

export const metadata = {
  title: "Kulüp Hakkında - Beyaz Martı Spor Kulübü",
  description: "Beyaz Martı Spor Kulübü hakkında bilgi edinin. Misyonumuz, vizyonumuz ve değerlerimiz.",
};

async function getJerseys() {
  try {
    const jerseys = await client.fetch(queries.jerseys);
    return jerseys || [];
  } catch (error) {
    console.error('Error fetching jerseys:', error);
    return [];
  }
}

export default async function KulupHakkindaPage() {
  const jerseys = await getJerseys();
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <PageHeader 
        title="Kulübümüz"
        subtitle="Beyaz Martı Spor Kulübü"
        description="27 Mart 2015 tarihinde kurulmuş, voleybol branşında faaliyet gösteren spor kulübümüz."
      />

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading font-bold text-3xl text-text mb-6">
              Tarihimiz
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Beyaz Martı Spor Kulübü 27 Mart 2015 tarihinde kurulmuş, 02 Şubat 2016 tarihinde Gençlik ve Spor İl Müdürlüğü tarafından Kulüp Tescili yapılmış ve 7405 sayılı Spor Kulüpleri Kanununa istinaden 34-01-02843 Kulüp numarası ile Spor Kulübü olarak kaydedilmiştir.
              </p>
              <p>
                Yerleşim yeri Bahçeköy Merkez, Orman Fakültesi No:2, 34473 Sarıyer/İstanbul adresindedir.
              </p>
              <p>
                Kulübümüz, Voleybol Branşında faaliyet göstermekte olup, renkleri lacivert-beyaz-kırmızıdır.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <Trophy className="h-8 w-8 text-accent mx-auto mb-2" />
                <div className="font-heading font-bold text-2xl text-text">15+</div>
                <div className="text-gray-300 text-sm">Şampiyonluk</div>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="font-heading font-bold text-2xl text-text">200+</div>
                <div className="text-gray-300 text-sm">Aktif Sporcu</div>
              </div>
              <div className="text-center">
                <Target className="h-8 w-8 text-accent mx-auto mb-2" />
                <div className="font-heading font-bold text-2xl text-text">10+</div>
                <div className="text-gray-300 text-sm">Yıllık Deneyim</div>
              </div>
              <div className="text-center">
                <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="font-heading font-bold text-2xl text-text">11</div>
                <div className="text-gray-300 text-sm">Takım</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-surface/5">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl text-text mb-4">
            Misyonumuz ve Vizyonumuz
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Sporun gücüyle gençlerimizi geleceğe hazırlıyoruz
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-surface/10 rounded-2xl p-8">
            <Target className="h-12 w-12 text-primary mb-4" />
            <h3 className="font-heading font-bold text-2xl text-text mb-4">
              Misyonumuz
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Eğitimin insan yaşamındaki rolünün gittikçe önem kazandığı günümüzde zeki, çevik, çalışkan, dürüst, ahlaklı, cesaretli, sorumluluk ve özgüven sahibi, çevresine duyarlı, sosyal yönü ve iletişim kabiliyeti güçlü sporcular yetiştirerek, milli takımlarımıza kazandırmak ve uluslararası yarışmalarda ülkemizin en iyi şekilde temsil edilmesine katkıda bulunmaktır.
            </p>
          </div>

          <div className="bg-surface/10 rounded-2xl p-8">
            <Trophy className="h-12 w-12 text-accent mb-4" />
            <h3 className="font-heading font-bold text-2xl text-text mb-4">
              Vizyonumuz
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Dünyadaki sportif değişimleri yakından takip ederek, bilgi, beceri ve antrenman konularında geliştirdiğimiz yöntem planlama ve stratejiler doğrultusunda, diğer kulüplere geniş ufku ile öncülük ve engin bilgisi ile rehberlik yapacak bir kulüp modeli oluşturarak ülkemizin yüksek spor kültürüne ulaşmasında pay sahibi olmaktır.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl text-text mb-4">
            Değerlerimiz
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Kulübümüzün temel değerleri ve ilkeleri
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold text-text mb-2">Takım Ruhu</h3>
            <p className="text-sm text-gray-300">
              Birlikte çalışmanın ve dayanışmanın gücüne inanıyoruz.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold text-text mb-2">Disiplin</h3>
            <p className="text-sm text-gray-300">
              Düzenli antrenman ve çalışma disiplini ile hedeflere ulaşırız.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold text-text mb-2">Başarı</h3>
            <p className="text-sm text-gray-300">
              Sürekli gelişim ve mükemmellik arayışı içindeyiz.
            </p>
          </div>
        </div>
      </Section>

      {/* Formalarımız Bölümü */}
      {jerseys.length > 0 && (
        <Section>
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-text mb-4">
              Formalarımız
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Kulübümüzün farklı kategorilerdeki formaları
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className={`flex gap-6 pb-4 ${jerseys.length === 1 ? 'justify-center' : 'min-w-max'}`}>
              {jerseys.map((jersey: any) => (
                <div key={jersey._id} className={`${jerseys.length === 1 ? 'flex-shrink' : 'flex-shrink-0'} w-80`}>
                  <div className="bg-surface/10 rounded-2xl p-6 border border-surface/20 hover:bg-surface/20 transition-all duration-300">
                    <h3 className="font-semibold text-white text-lg mb-4 text-center">
                      {jersey.name}
                    </h3>
                    
                    <div className="space-y-4">
                      {jersey.image1?.asset?.url && (
                        <div className="relative">
                          <Image
                            src={jersey.image1.asset.url}
                            alt={jersey.image1.alt || jersey.name}
                            width={600}
                            height={800}
                            quality={90}
                            sizes="(max-width: 768px) 100vw, 320px"
                            className="w-full h-auto rounded-lg object-cover"
                          />
                        </div>
                      )}
                      
                      {jersey.image2?.asset?.url && (
                        <div className="relative">
                          <Image
                            src={jersey.image2.asset.url}
                            alt={jersey.image2.alt || jersey.name}
                            width={600}
                            height={800}
                            quality={90}
                            sizes="(max-width: 768px) 100vw, 320px"
                            className="w-full h-auto rounded-lg object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      <SiteFooter />
    </div>
  );
}
