import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { client, queries } from "@/lib/sanity";
import { PortableText } from '@portabletext/react';

// Revalidate every 60 seconds to keep blog posts fresh
export const revalidate = 60;

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getPostBySlug(slug: string) {
  try {
    const post = await client.fetch(queries.postBySlug, { slug });
    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: "Blog Yazısı Bulunamadı - Beyaz Martı Spor Kulübü",
    };
  }

  return {
    title: `${post.title} - Beyaz Martı Spor Kulübü`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

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

            {post.coverImage?.asset?.url && (
              <div className="mb-8">
                <div className="relative w-full">
                  <Image
                    src={post.coverImage.asset.url}
                    alt={post.coverImage.alt || post.title}
                    width={1600}
                    height={900}
                    quality={90}
                    sizes="100vw"
                    className="w-full h-auto rounded-lg object-contain bg-black/20"
                    priority
                  />
                </div>
              </div>
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag: any) => (
                  <span 
                    key={tag._id}
                    className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full"
                  >
                    {tag.title}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {post.excerpt}
            </p>
            
            <div className="prose prose-invert max-w-none">
              <PortableText 
                value={post.content}
                components={{
                  block: {
                    normal: ({children}) => <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>,
                    h1: ({children}) => <h1 className="text-3xl font-bold text-white mb-6">{children}</h1>,
                    h2: ({children}) => <h2 className="text-2xl font-bold text-white mb-4">{children}</h2>,
                    h3: ({children}) => <h3 className="text-xl font-bold text-white mb-3">{children}</h3>,
                  },
                  list: {
                    bullet: ({children}) => <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">{children}</ul>,
                    number: ({children}) => <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2">{children}</ol>,
                  },
                  listItem: {
                    bullet: ({children}) => <li className="text-gray-300">{children}</li>,
                    number: ({children}) => <li className="text-gray-300">{children}</li>,
                  },
                  marks: {
                    strong: ({children}) => <strong className="font-bold text-white">{children}</strong>,
                    em: ({children}) => <em className="italic text-gray-200">{children}</em>,
                  },
                }}
              />
            </div>
          </div>
        </div>
      </Section>

      <SiteFooter />
    </div>
  );
}