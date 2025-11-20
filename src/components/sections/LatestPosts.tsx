"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import { fetchWithRetry, queries } from "@/lib/sanity";

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
    const posts = await fetchWithRetry<Post[]>(queries.latestPosts, {}, 3);
    return Array.isArray(posts) ? posts : [];
  } catch (error) {
    console.error('Error fetching latest posts:', error);
    // Hata durumunda boş array döndür, component crash etmesin
    return [];
  }
}

export function LatestPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getLatestPosts();
        setPosts(data);
      } catch (err) {
        console.error('Failed to load posts:', err);
        setError('Blog yazıları yüklenirken bir hata oluştu.');
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadPosts();
  }, []);

  // Auto-scroll for mobile carousel
  useEffect(() => {
    if (isPaused || posts.length === 0) return;
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth - 10) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 0.5;
      }
    };

    const interval = setInterval(scroll, 50);
    return () => clearInterval(interval);
  }, [isPaused, posts.length]);

  const handleTouchStart = () => {
    setIsPaused(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => setIsPaused(false), 2000);
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="py-16 bg-surface/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-text mb-4">
              Son Haberler
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Yükleniyor...
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-16 bg-surface/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-text mb-4">
              Son Haberler
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (!posts || posts.length === 0) {
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

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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

        {/* Mobile: Carousel */}
        <div 
          ref={scrollContainerRef}
          className="md:hidden flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 mb-12 scrollbar-hide"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {posts.map((post) => (
            <div key={post._id} className="group shrink-0 w-[300px]">
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
                          sizes="300px"
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
