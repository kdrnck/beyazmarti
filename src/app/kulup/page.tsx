import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { Trophy, Target, Users, Heart } from "lucide-react";

export const metadata = {
  title: "Kulüp - Beyaz Martı Spor Kulübü",
  description: "Beyaz Martı Spor Kulübü hakkında bilgi edinin. Tarihimiz, misyonumuz ve vizyonumuz.",
};

export default function KulupPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <PageHeader 
        title="Kulübümüz"
        subtitle="Beyaz Martı Spor Kulübü"
        description="Sporun gücüyle gençlerimizi geleceğe hazırlıyoruz. Disiplin, takım ruhu ve mükemmellik arayışımızla fark yaratıyoruz."
      />

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading font-bold text-3xl text-text mb-6">
              Tarihimiz
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Beyaz Martı Spor Kulübü, 2014 yılında sporun gücüne inanan bir grup idealist tarafından kurulmuştur. 
                Amacımız, gençlerimizi sadece spor yapmaya değil, aynı zamanda karakter gelişimine de odaklanarak 
                geleceğe hazırlamaktır.
              </p>
              <p>
                Kuruluşumuzdan bu yana, binlerce gencin hayatına dokunduk. Onlara sadece spor teknikleri değil, 
                aynı zamanda takım çalışması, liderlik, disiplin ve saygı gibi değerleri de öğrettik.
              </p>
              <p>
                Bugün, farklı yaş gruplarından 200'den fazla aktif sporcumuzla faaliyetlerimizi sürdürüyoruz. 
                Futbol, basketbol ve voleybol branşlarında başarılı takımlarımız bulunmaktadır.
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
                <div className="font-heading font-bold text-2xl text-text">3</div>
                <div className="text-gray-300 text-sm">Branş</div>
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
              Gençlerimizi spor yoluyla fiziksel, zihinsel ve sosyal gelişimlerini destekleyerek, 
              onları geleceğe hazırlamak. Disiplin, takım ruhu, saygı ve fair play değerlerini 
              benimseyen bireyler yetiştirmek.
            </p>
          </div>

          <div className="bg-surface/10 rounded-2xl p-8">
            <Trophy className="h-12 w-12 text-accent mb-4" />
            <h3 className="font-heading font-bold text-2xl text-text mb-4">
              Vizyonumuz
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Türkiye'nin önde gelen spor kulüplerinden biri olmak ve sporcularımızın 
              ulusal ve uluslararası arenada başarılar elde etmelerini sağlamak. 
              Spor kültürünü topluma yaymak ve spor sevgisini aşılamak.
            </p>
          </div>
        </div>
      </Section>

      <SiteFooter />
    </div>
  );
}
