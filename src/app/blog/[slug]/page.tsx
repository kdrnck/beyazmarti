import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Mock data - gerçek veriler Sanity'den gelecek
const mockPosts = {
  "2024-sezonu-basliyor": {
    title: "2024 Sezonu Başlıyor!",
    content: `
      <p>Yeni sezonda takımlarımızın hazırlıkları devam ediyor. Genç yeteneklerimizle birlikte büyük hedeflerimiz var.</p>
      
      <p>Bu sezon özellikle genç takımlarımıza odaklanacağız. Futbol, basketbol ve voleybol branşlarında yeni yetenekler keşfetmeye devam ediyoruz.</p>
      
      <h3>Sezon Hedeflerimiz</h3>
      <ul>
        <li>Genç sporcularımızın gelişimini desteklemek</li>
        <li>Takım ruhunu güçlendirmek</li>
        <li>Fair play değerlerini benimsetmek</li>
        <li>Sportif başarılar elde etmek</li>
      </ul>
      
      <p>Tüm sporcularımıza başarılı bir sezon dileriz!</p>
    `,
    publishedAt: "2024-01-15",
    tags: ["Duyuru", "Sezon"],
    excerpt: "Yeni sezonda takımlarımızın hazırlıkları devam ediyor. Genç yeteneklerimizle birlikte büyük hedeflerimiz var.",
  },
  "antrenman-programlari-guncellendi": {
    title: "Antrenman Programları Güncellendi",
    content: `
      <p>Sporcularımızın performansını artırmak için antrenman programlarımızı yeniledik.</p>
      
      <p>Yeni programlarımızda:</p>
      <ul>
        <li>Fiziksel kondisyon çalışmaları</li>
        <li>Teknik gelişim egzersizleri</li>
        <li>Taktiksel eğitimler</li>
        <li>Mental hazırlık çalışmaları</li>
      </ul>
      
      <p>Detaylı bilgi için antrenörlerimizle iletişime geçebilirsiniz.</p>
    `,
    publishedAt: "2024-01-10",
    tags: ["Antrenman", "Güncelleme"],
    excerpt: "Sporcularımızın performansını artırmak için antrenman programlarımızı yeniledik. Detaylar için okuyun.",
  },
  "yeni-teknik-kadro-aciklandi": {
    title: "Yeni Teknik Kadro Açıklandı",
    content: `
      <p>2024 sezonu için teknik kadromuzu açıkladık. Deneyimli antrenörlerimizle güçlü bir kadro oluşturduk.</p>
      
      <h3>Teknik Kadromuz</h3>
      <ul>
        <li>Futbol: Mehmet Yılmaz (Baş Antrenör)</li>
        <li>Basketbol: Ayşe Demir (Baş Antrenör)</li>
        <li>Voleybol: Can Özkan (Baş Antrenör)</li>
      </ul>
      
      <p>Tüm antrenörlerimiz alanlarında uzman ve deneyimli kişilerdir.</p>
    `,
    publishedAt: "2024-01-05",
    tags: ["Teknik Kadro", "Duyuru"],
    excerpt: "2024 sezonu için teknik kadromuzu açıkladık. Deneyimli antrenörlerimizle güçlü bir kadro oluşturduk.",
  },
};

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = mockPosts[params.slug as keyof typeof mockPosts];
  
  if (!post) {
    return {
      title: "Post Bulunamadı - Beyaz Martı Spor Kulübü",
    };
  }

  return {
    title: `${post.title} - Beyaz Martı Spor Kulübü`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = mockPosts[params.slug as keyof typeof mockPosts];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <PageHeader 
        title={post.title}
        subtitle="Blog"
      />

      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link 
              href="/blog"
              className="inline-flex items-center text-primary hover:text-primary-dark transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Blog'a Dön
            </Link>
            
            <div className="flex items-center text-sm text-gray-400 mb-6">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(post.publishedAt).toLocaleDateString("tr-TR")}
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div 
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </Section>

      <SiteFooter />
    </div>
  );
}
