"use client";

import { useState, useEffect, useRef } from "react";
import { Section } from "@/components/sections/Section";
import { Music, Play, Pause, Volume2 } from "lucide-react";

interface AnthemData {
  _id: string;
  title: string;
  description?: string;
  audioFile?: {
    asset?: {
      url: string;
      originalFilename?: string;
    };
    credit?: string;
  };
}

export function AnthemSection() {
  const [anthemData, setAnthemData] = useState<AnthemData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    async function fetchAnthem() {
      try {
        const response = await fetch("/api/sanity/anthem");
        if (response.ok) {
          const data = await response.json();
          setAnthemData(data.anthem);
        }
      } catch (error) {
        console.error("Error fetching anthem:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAnthem();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
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

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const skipTime = (seconds: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + seconds));
    }
  };

  if (isLoading) {
    return null;
  }

  if (!anthemData?.audioFile?.asset?.url) {
    return null;
  }

  return (
    <Section className="bg-surface/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-heading font-bold text-3xl text-text mb-4">
            Marşımız
          </h2>
          {anthemData.description && (
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              {anthemData.description}
            </p>
          )}
        </div>

        <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl p-8 border border-white/10 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center flex-shrink-0">
              <Music className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-2xl text-white mb-1">
                {anthemData.title}
              </h3>
              {anthemData.audioFile?.credit && (
                <p className="text-gray-300 text-sm">
                  {anthemData.audioFile.credit}
                </p>
              )}
            </div>
          </div>

          {/* Hidden audio element */}
          <audio 
            ref={audioRef} 
            preload="metadata"
          >
            <source src={anthemData.audioFile.asset.url} type="audio/mpeg" />
          </audio>

          {/* Player Controls */}
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <button
                onClick={() => skipTime(-10)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-colors"
              >
                ← 10s
              </button>

              <button
                onClick={togglePlay}
                className="p-4 bg-primary hover:bg-primary/90 rounded-full text-white transition-colors shadow-lg"
                aria-label={isPlaying ? "Durdur" : "Çal"}
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6 ml-0.5" />
                )}
              </button>

              <button
                onClick={() => skipTime(10)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-colors"
              >
                10s →
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-3">
              <Volume2 className="h-5 w-5 text-white/70 flex-shrink-0" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="flex-1 accent-primary cursor-pointer"
              />
              <span className="text-white/70 text-sm font-medium w-10 text-right">
                {volume}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

