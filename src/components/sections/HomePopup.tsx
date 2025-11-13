"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from '@portabletext/react';
import { fetchWithRetry, queries, urlFor } from "@/lib/sanity";

interface PopupData {
  _id: string;
  title: string;
  content: any[]; // PortableText content
  buttonText: string;
  buttonLink: string;
}

export function HomePopup() {
  const [popup, setPopup] = useState<PopupData | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchPopup() {
      try {
        const data = await fetchWithRetry<PopupData | null>(queries.activePopup, {}, 2, ['popup', 'home']);
        if (data) {
          setPopup(data);
          setIsOpen(true);
        }
      } catch (error) {
        console.error('Error fetching popup:', error);
      }
    }
    fetchPopup();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!popup) {
    return null;
  }

  // Extract text content for DialogDescription (accessibility)
  const getPlainText = (content: any[]): string => {
    if (!content || !Array.isArray(content)) return '';
    return content
      .map((block: any) => {
        if (block._type === 'block' && block.children) {
          return block.children.map((child: any) => child.text || '').join('');
        }
        return '';
      })
      .join(' ');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md bg-background/95 border border-surface/30 backdrop-blur-xl text-text">
        <DialogHeader>
          <DialogTitle className="text-text text-2xl font-bold text-center">
            {popup.title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {getPlainText(popup.content)}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="text-text leading-relaxed">
            <PortableText
              value={popup.content}
              components={{
                block: {
                  normal: ({children}) => <p className="text-text mb-4 leading-relaxed text-center">{children}</p>,
                  h1: ({children}) => <h1 className="text-2xl font-bold text-text mb-3 text-center">{children}</h1>,
                  h2: ({children}) => <h2 className="text-xl font-bold text-text mb-3 text-center">{children}</h2>,
                  h3: ({children}) => <h3 className="text-lg font-bold text-text mb-2 text-center">{children}</h3>,
                  blockquote: ({children}) => <blockquote className="border-l-4 border-primary/50 pl-4 italic text-text/80 mb-4">{children}</blockquote>,
                },
                list: {
                  bullet: ({children}) => <ul className="list-disc list-inside text-text mb-4 space-y-2 text-center">{children}</ul>,
                  number: ({children}) => <ol className="list-decimal list-inside text-text mb-4 space-y-2 text-center">{children}</ol>,
                },
                listItem: {
                  bullet: ({children}) => <li className="text-text">{children}</li>,
                  number: ({children}) => <li className="text-text">{children}</li>,
                },
                marks: {
                  strong: ({children}) => <strong className="font-bold text-text">{children}</strong>,
                  em: ({children}) => <em className="italic text-text/90">{children}</em>,
                  link: ({children, value}) => (
                    <Link href={value?.href || '#'} className="text-primary hover:text-accent underline">
                      {children}
                    </Link>
                  ),
                },
                types: {
                  image: ({value}) => {
                    if (!value?.asset?.url) return null;
                    return (
                      <div className="my-4 flex justify-center">
                        <Image
                          src={value.asset.url}
                          alt={value.alt || 'Popup görseli'}
                          width={400}
                          height={300}
                          className="rounded-lg max-w-full h-auto"
                          quality={90}
                        />
                      </div>
                    );
                  },
                },
              }}
            />
          </div>
          
          <div className="flex flex-col gap-3">
            <Button asChild className="bg-primary hover:bg-accent text-white w-full">
              <Link href={popup.buttonLink} onClick={handleClose}>
                {popup.buttonText}
              </Link>
            </Button>
            
            <Button
              variant="outline"
              onClick={handleClose}
              className="w-full text-text border-surface/30 hover:bg-surface/10"
            >
              Kapat
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
