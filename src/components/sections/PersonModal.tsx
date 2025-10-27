"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface PersonModalProps {
  person: {
    _id: string;
    name: string;
    role?: string;
    bio?: string;
    experience?: string;
    certifications?: string[];
    photo?: { asset?: { url: string }, alt?: string };
  };
  isOpen: boolean;
  onClose: () => void;
}

export function PersonModal({ person, isOpen, onClose }: PersonModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background/95 border border-surface/30 backdrop-blur-xl text-text">
        <DialogHeader>
          <DialogTitle className="text-text text-2xl font-bold text-center">{person.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              {person.photo?.asset?.url ? (
                <Image src={person.photo.asset.url} alt={person.photo.alt || person.name} width={220} height={220} className="rounded-full object-cover border-4 border-primary/20" />
              ) : (
                <div className="w-52 h-52 bg-gray-600 rounded-full" />
              )}
            </div>
          </div>

          <Card className="bg-surface/10 border-surface/20">
            <CardContent className="p-6">
              <div className="space-y-2 text-center">
                {person.role && <div className="px-3 py-1 bg-gradient-to-r from-primary to-primary/80 text-white text-sm rounded-full font-semibold inline-block">{person.role}</div>}
                {person.experience && (
                  <div className="text-sm text-gray-300">
                    <span className="text-text font-medium">Deneyim:</span> {person.experience}
                  </div>
                )}
              </div>

              {person.certifications && person.certifications.length > 0 && (
                <div className="text-center mt-4">
                  <h4 className="text-xs font-medium text-gray-400 mb-2">Sertifikalar</h4>
                  <div className="flex flex-wrap justify-center gap-1">
                    {person.certifications.map((c, i) => (
                      <span key={i} className="px-2 py-1 bg-surface/20 text-gray-300 text-xs rounded">{c}</span>
                    ))}
                  </div>
                </div>
              )}

              {person.bio && (
                <div className="mt-6 pt-4 border-t border-surface/20 text-center">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Biyografi</h4>
                  <p className="text-text leading-relaxed whitespace-pre-wrap">{person.bio}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}


