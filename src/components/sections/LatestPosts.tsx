"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";

// Mock data - gerçek veriler Sanity'den gelecek
const mockPosts = [
  {
    id: "1",
    title: "2024 Sezonu Başlıyor!",
    excerpt: "Yeni sezonda takımlarımızın hazırlıkları devam ediyor. Genç yeteneklerimizle birlikte büyük hedeflerimiz var.",
    publishedAt: "2024-01-15",
    slug: "2024-sezonu-basliyor",
    coverImage: "/api/placeholder/400/250",
  },
  {
    id: "2", 
    title: "Antrenman Programları Güncellendi",
    excerpt: "Sporcularımızın performansını artırmak için antrenman programlarımızı yeniledik. Detaylar için okuyun.",
    publishedAt: "2024-01-10",
    slug: "antrenman-programlari-guncellendi",
    coverImage: "/api/placeholder/400/250",
  },
  {
    id: "3",
    title: "Yeni Teknik Kadro Açıklandı",
    excerpt: "2024 sezonu için teknik kadromuzu açıkladık. Deneyimli antrenörlerimizle güçlü bir kadro oluşturduk.",
    publishedAt: "2024-01-05",
    slug: "yeni-teknik-kadro-aciklandi",
    coverImage: "/api/placeholder/400/250",
  },
];

export function LatestPosts() {
  return (
    <section className="py-16 bg-surface/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-text mb-4">
            Son Haberler
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Kulübümüzden en güncel haberleri ve duyuruları takip edin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {mockPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full bg-surface/10 border-surface/20 hover:bg-surface/20 transition-colors">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg" />
                <CardHeader>
                  <div className="flex items-center text-sm text-gray-400 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(post.publishedAt).toLocaleDateString("tr-TR")}
                  </div>
                  <CardTitle className="text-text hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Button asChild variant="ghost" className="p-0 h-auto text-primary hover:text-primary-dark">
                    <Link href={`/blog/${post.slug}`}>
                      Devamını Oku
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
            <Link href="/blog">
              Tüm Haberleri Görüntüle
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
