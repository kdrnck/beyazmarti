import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import { client, queries } from "@/lib/sanity";

interface Post {
  _id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  slug: {
    current: string;
  };
  coverImage?: {
    asset?: {
      url: string;
    };
    alt?: string;
  };
  tags?: Array<{
    _id: string;
    title: string;
  }>;
}

async function getLatestPosts(): Promise<Post[]> {
  try {
    const posts = await client.fetch(queries.latestPosts);
    return posts || [];
  } catch (error) {
    console.error('Error fetching latest posts:', error);
    return [];
  }
}

export async function LatestPosts() {
  const posts = await getLatestPosts();

  if (posts.length === 0) {
    return (
      <section className="py-16 bg-surface/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-text mb-4">
              Son Haberler
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Henüz blog yazısı bulunmuyor
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-surface/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl text-text mb-4">
            Son Haberler
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Kulübümüzden en güncel haberler ve duyurular
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.map((post) => (
            <div key={post._id} className="group">
              <Card className="h-full bg-surface/10 border-surface/20 hover:bg-surface/20 transition-colors group">
                <Link href={`/blog/${post.slug.current}`}>
                  <CardHeader className="p-0">
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg overflow-hidden">
                      {post.coverImage?.asset?.url ? (
                        <Image
                          src={post.coverImage.asset.url}
                          alt={post.coverImage.alt || post.title}
                          width={600}
                          height={400}
                          quality={90}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center mx-auto mb-2">
                              <Calendar className="h-8 w-8 text-primary" />
                            </div>
                            <p className="text-primary text-sm font-medium">Blog Yazısı</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center text-xs text-gray-400 mb-3">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(post.publishedAt).toLocaleDateString("tr-TR")}
                    </div>
                    
                    <CardTitle className="text-text text-lg mb-3 group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                    
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {post.tags?.slice(0, 2).map((tag) => (
                          <span
                            key={tag._id}
                            className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full"
                          >
                            {tag.title}
                          </span>
                        ))}
                      </div>
                      <ArrowRight className="h-4 w-4 text-accent group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="bg-primary hover:bg-accent text-white">
            <Link href="/blog">
              Tüm Blog Yazıları
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}