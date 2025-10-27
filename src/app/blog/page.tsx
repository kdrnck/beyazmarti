import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { client, queries } from "@/lib/sanity";

export const metadata = {
  title: "Blog - Beyaz Martı Spor Kulübü",
  description: "Beyaz Martı Spor Kulübü'nden en güncel haberler ve duyurular.",
};

// Revalidate every 60 seconds to keep blog content fresh
export const revalidate = 60;

async function getPosts() {
  try {
    const posts = await client.fetch(queries.posts, {}, {
      next: { tags: ['posts'] }
    });
    return posts || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <PageHeader 
        title="Blog"
        subtitle="Haberler ve Duyurular"
        description="Kulübümüzden en güncel haberleri ve duyuruları takip edin."
      />

      <Section>
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts && posts.map((post: any) => (
              <Card key={post._id} className="bg-surface/10 border-surface/20 hover:bg-surface/20 transition-all duration-300 group">
                <Link href={`/blog/${post.slug.current}`}>
                  <CardHeader className="p-0">
                    <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg overflow-hidden">
                      {post.coverImage?.asset?.url ? (
                        <Image
                          src={post.coverImage.asset.url}
                          alt={post.coverImage.alt || post.title}
                          width={1200}
                          height={675}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="w-full h-auto object-contain bg-black/20 group-hover:opacity-95 transition-opacity duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center mx-auto mb-2">
                              <Calendar className="h-8 w-8 text-primary" />
                            </div>
                            <p className="text-primary font-semibold">Blog Yazısı</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center text-sm text-gray-400 mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(post.publishedAt).toLocaleDateString("tr-TR")}
                    </div>
                    
                    <CardTitle className="text-text text-lg mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                    
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {post.tags?.slice(0, 2).map((tag: any) => (
                          <span 
                            key={tag._id}
                            className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full"
                          >
                            {tag.title}
                          </span>
                        ))}
                      </div>
                      <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-text mb-2">Henüz Blog Yazısı Yok</h3>
            <p className="text-gray-400 mb-4">
              Blog yazıları henüz yüklenmedi.
            </p>
            <p className="text-sm text-gray-500">
              Admin panelinden blog yazıları yüklendikten sonra burada görünecek.
            </p>
          </div>
        )}
      </Section>

      <SiteFooter />
    </div>
  );
}

