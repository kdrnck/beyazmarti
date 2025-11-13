"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Menu, Music, Pause, Play, Volume2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const navigation = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Kulüp Hakkında", href: "/kulup-hakkinda" },
  { name: "Takımlarımız", href: "/takimlarimiz" },
  { name: "Hazırlık Grupları", href: "/hazirlik-gruplari" },
  { name: "Yönetim Kurulu", href: "/yonetim-kurulu" },
  { name: "Teknik Ekip", href: "/teknik-ekip" },
  { name: "Blog", href: "/blog" },
  { name: "İletişim", href: "/iletisim" },
];

interface AnthemAsset {
  url?: string;
  originalFilename?: string;
  mimeType?: string;
}

interface AnthemData {
  title: string;
  description?: string;
  audioFile?: {
    asset?: AnthemAsset;
    credit?: string;
  };
}

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [anthemData, setAnthemData] = useState<AnthemData | null>(null);
  const [anthemError, setAnthemError] = useState<string | null>(null);
  const [isAnthemLoading, setIsAnthemLoading] = useState(true);
  const [isAnthemModalOpenDesktop, setIsAnthemModalOpenDesktop] = useState(false);
  const [isAnthemModalOpenMobile, setIsAnthemModalOpenMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEverPlayed, setHasEverPlayed] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function loadAnthem() {
      try {
        setIsAnthemLoading(true);
        setAnthemError(null);
        const response = await fetch("/api/sanity/anthem", { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        if (!cancelled) {
          setAnthemData(data.anthem);
        }
      } catch (error) {
        if (!cancelled) {
          setAnthemData(null);
          setAnthemError("Takım marşı yüklenemedi");
        }
      } finally {
        if (!cancelled) {
          setIsAnthemLoading(false);
        }
      }
    }

    loadAnthem();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => {
      setIsPlaying(true);
      setHasEverPlayed(true);
    };
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [anthemData?.audioFile?.asset?.url]);

  if (!mounted) {
    return null;
  }

  const anthemAvailable = Boolean(anthemData?.audioFile?.asset?.url);

  const renderAnthemButton = () => {
    if (isAnthemLoading) {
      return (
        <div className="flex items-center gap-2 text-white/80 text-xs px-3 py-1.5">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Yükleniyor...</span>
        </div>
      );
    }

    if (!anthemAvailable) {
      return null;
    }

    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsAnthemModalOpenDesktop(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 transition-all duration-300 text-white"
        >
          <Music className="h-4 w-4" aria-hidden />
          <span className="text-sm font-semibold">Marşımız</span>
        </button>
        
        {/* Play/Pause button - only shows after first play */}
        {hasEverPlayed && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              const audio = audioRef.current;
              if (audio) {
                if (audio.paused) {
                  audio.play();
                } else {
                  audio.pause();
                }
              }
            }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 transition-all duration-300 text-white"
            aria-label={isPlaying ? "Durdur" : "Çal"}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    );
  };

  const renderAnthemModal = () => {
    if (!anthemAvailable || !audioRef.current) return null;

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <Music className="h-5 w-5 text-white" aria-hidden />
          <div>
            <h3 className="font-semibold text-white">{anthemData?.title}</h3>
            {anthemData?.description && (
              <p className="text-sm text-white/70 mt-1">{anthemData.description}</p>
            )}
          </div>
        </div>
        
        <p className="text-xs text-white/60 text-center">
          Bu ekranı kapatıp marşımızı dinlemeye devam edebilirsiniz!
        </p>
        
        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          {/* Player Controls */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <button
              onClick={() => {
                const audio = audioRef.current;
                if (audio) audio.currentTime = Math.max(0, audio.currentTime - 10);
              }}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
            >
              ← 10s
            </button>
            
            <button
              onClick={() => {
                const audio = audioRef.current;
                if (audio) {
                  if (audio.paused) {
                    audio.play();
                  } else {
                    audio.pause();
                  }
                }
              }}
              className="p-4 bg-accent hover:bg-accent/90 rounded-full text-white transition-colors"
              aria-label={isPlaying ? "Durdur" : "Çal"}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-0.5" />
              )}
            </button>
            
            <button
              onClick={() => {
                const audio = audioRef.current;
                if (audio) audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
              }}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
            >
              10s →
            </button>
          </div>
          
          {/* Volume Control */}
          <div className="flex items-center gap-3">
            <Volume2 className="h-4 w-4 text-white/70 flex-shrink-0" />
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="70"
              onChange={(e) => {
                const audio = audioRef.current;
                if (audio) audio.volume = Number(e.target.value) / 100;
              }}
              className="flex-1 accent-accent cursor-pointer"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-primary/95 backdrop-blur-md shadow-lg border-b border-primary/20"
          : "bg-gradient-to-r from-primary via-primary-dark to-primary backdrop-blur-sm"
      }`}
    >
      {/* Hidden audio element for background playback */}
      {anthemAvailable && (
        <audio ref={audioRef} preload="metadata">
          <source src={anthemData?.audioFile?.asset?.url} type="audio/mpeg" />
        </audio>
      )}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/logo.png"
                  alt="Beyaz Martı Spor Kulübü"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain"
                  priority
                />
              </div>
              <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="h-3 w-3 bg-accent rounded-full animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg text-white leading-tight">
                Beyaz Martı
              </span>
              <span className="font-heading text-xs text-white/80 leading-tight">
                Spor Kulübü
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-medium text-white hover:text-white transition-all duration-300 group"
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent group-hover:w-8 transition-all duration-300" />
                </Link>
              ))}
            </nav>
            
            {/* Desktop Anthem Button + Modal */}
            <Dialog open={isAnthemModalOpenDesktop} onOpenChange={setIsAnthemModalOpenDesktop}>
              <DialogTrigger asChild>
                <div>{renderAnthemButton()}</div>
              </DialogTrigger>
              <DialogContent className="bg-primary-dark text-white border border-primary max-w-md z-[100]">
                <DialogHeader>
                  <DialogTitle>Takım Marşı</DialogTitle>
                </DialogHeader>
                {renderAnthemModal()}
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            {/* Mobile Anthem Button + Modal */}
            {anthemAvailable && !isAnthemLoading && (
              <>
                <Dialog open={isAnthemModalOpenMobile} onOpenChange={setIsAnthemModalOpenMobile}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/10 rounded-lg"
                    >
                      <Music className="h-5 w-5" />
                      <span className="sr-only">Takım marşını aç</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-primary-dark text-white border border-primary max-w-sm z-[100]">
                    <DialogHeader>
                      <DialogTitle>Takım Marşı</DialogTitle>
                    </DialogHeader>
                    {renderAnthemModal()}
                  </DialogContent>
                </Dialog>
                
                {/* Mobile Play/Pause button - only shows after first play */}
                {hasEverPlayed && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const audio = audioRef.current;
                      if (audio) {
                        if (audio.paused) {
                          audio.play();
                        } else {
                          audio.pause();
                        }
                      }
                    }}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                    aria-label={isPlaying ? "Durdur" : "Çal"}
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </button>
                )}
              </>
            )}

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-lg">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Menüyü aç</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] bg-primary-dark border-primary"
              >
                <SheetTitle className="sr-only">Navigasyon Menüsü</SheetTitle>
                <div className="flex flex-col space-y-2 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium text-white hover:text-accent transition-colors py-3 px-4 rounded-lg hover:bg-white/10"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

