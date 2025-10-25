"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, Users, Target } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background/95 to-background">
      {/* Elegant Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      {/* Geometric Shapes */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-accent/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-primary/15 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-1/4 w-16 h-16 bg-accent/15 rounded-full blur-lg"></div>
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading font-bold text-5xl md:text-7xl text-white mb-6">
              Beyaz Martı
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Spor Kulübü
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Sporun gücüyle gençlerimizi geleceğe hazırlıyoruz. 
            Disiplin, takım ruhu ve mükemmellik arayışımızla fark yaratıyoruz.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button asChild size="lg" className="bg-primary hover:bg-primary-dark text-white">
              <Link href="/kulup">
                Kulübümüzü Keşfedin
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-background">
              <Link href="/takimlarimiz">
                Takımlarımız
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            <div className="text-center">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 mb-4 border border-white/20 shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105">
                <div className="p-3 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full w-fit mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-accent" />
                </div>
                <div className="font-heading font-bold text-4xl text-white mb-2">15+</div>
                <div className="text-gray-300 font-medium">Şampiyonluk</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 mb-4 border border-white/20 shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105">
                <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full w-fit mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="font-heading font-bold text-4xl text-white mb-2">200+</div>
                <div className="text-gray-300 font-medium">Aktif Sporcu</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 mb-4 border border-white/20 shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105">
                <div className="p-3 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full w-fit mx-auto mb-4">
                  <Target className="h-8 w-8 text-accent" />
                </div>
                <div className="font-heading font-bold text-4xl text-white mb-2">10+</div>
                <div className="text-gray-300 font-medium">Yıllık Deneyim</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
