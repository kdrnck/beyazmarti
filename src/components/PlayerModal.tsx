"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import Image from "next/image";

interface PlayerModalProps {
  player: {
    _id: string;
    name: string;
    position?: string;
    number?: number;
    age?: number;
    bio?: string;
    photo?: {
      asset?: {
        _id: string;
        url: string;
      };
      alt?: string;
    };
  };
  isOpen: boolean;
  onClose: () => void;
}

export function PlayerModal({ player, isOpen, onClose }: PlayerModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-surface/95 border-surface/20">
        <DialogHeader>
          <DialogTitle className="text-text text-2xl font-bold text-center">
            {player.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Oyuncu Fotoğrafı */}
          <div className="flex justify-center">
            <div className="relative">
              {player.photo?.asset?.url ? (
                <Image
                  src={player.photo.asset.url}
                  alt={player.photo.alt || player.name}
                  width={200}
                  height={200}
                  className="rounded-full object-cover border-4 border-primary/20"
                />
              ) : (
                <div className="w-48 h-48 bg-gray-600 rounded-full flex items-center justify-center border-4 border-primary/20">
                  <Users className="h-24 w-24 text-gray-400" />
                </div>
              )}
              {player.number && (
                <div className="absolute -top-2 -right-2 bg-primary text-white text-2xl rounded-full w-12 h-12 flex items-center justify-center font-bold shadow-lg">
                  {player.number}
                </div>
              )}
            </div>
          </div>

          {/* Oyuncu Detayları */}
          <Card className="bg-surface/10 border-surface/20">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {player.position && (
                  <div className="text-center">
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Pozisyon</h4>
                    <p className="text-text font-semibold">{player.position}</p>
                  </div>
                )}
                
                {player.age && (
                  <div className="text-center">
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Yaş</h4>
                    <p className="text-text font-semibold">{player.age}</p>
                  </div>
                )}
              </div>

              {player.bio && (
                <div className="mt-6 pt-4 border-t border-surface/20">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Biyografi</h4>
                  <p className="text-text leading-relaxed">{player.bio}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}