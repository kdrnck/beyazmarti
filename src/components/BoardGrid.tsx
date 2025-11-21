"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Crown } from "lucide-react";
import Image from "next/image";
import { PersonModal } from "@/components/sections/PersonModal";

interface BoardMember {
  _id: string;
  name: string;
  role?: string;
  bio?: string;
  position?: string;
  photo?: { asset?: { url: string }, alt?: string };
}

export function BoardGrid({ members }: { members: BoardMember[] }) {
  const [selected, setSelected] = useState<BoardMember | null>(null);
  const [open, setOpen] = useState(false);
  const [isPausedRow1, setIsPausedRow1] = useState(false);
  const [isPausedRow2, setIsPausedRow2] = useState(false);
  const scrollContainerRow1Ref = useRef<HTMLDivElement>(null);
  const scrollContainerRow2Ref = useRef<HTMLDivElement>(null);

  const onClick = (m: BoardMember) => { setSelected(m); setOpen(true); };

  // Debug: Log member data in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && members.length > 0) {
      console.log('📋 BoardGrid received members:', members.length);
      console.log('📋 Sample member:', members[0]);
      console.log('📋 All positions:', members.map(m => m.position));
    }
  }, [members]);

  // Pozisyon sıralaması: Başkan > Başkan Yardımcısı > Sekreter > Sayman > Şube Sorumlusu
  const positionOrder: { [key: string]: number } = {
    'baskan': 1,
    'baskan-yardimcisi': 2,
    'sekreter': 3,
    'sayman': 4,
    'sube-sorumlusu': 5,
  };

  // Pozisyona göre sıralı üyeler
  const sortedMembers = [...members].sort((a, b) => {
    const orderA = positionOrder[a.position || ''] || 999;
    const orderB = positionOrder[b.position || ''] || 999;
    // If same position order, sort by order field if available
    if (orderA === orderB && orderA !== 999) {
      return (a as any).order - (b as any).order;
    }
    return orderA - orderB;
  });

  // Row 1: Üst Düzey Yöneticiler (Başkan, Başkan Yardımcısı, Sekreter)
  const row1Members = sortedMembers.filter(m => 
    m.position === 'baskan' || m.position === 'baskan-yardimcisi' || m.position === 'sekreter'
  );
  // Row 2: Operasyonel Pozisyonlar (Sayman, Şube Sorumlusu)
  const row2Members = sortedMembers.filter(m => 
    m.position === 'sayman' || m.position === 'sube-sorumlusu'
  );
  
  // Eğer hiçbir üye filtreleme kriterlerine uymuyorsa, tüm üyeleri göster
  const hasFilteredMembers = row1Members.length > 0 || row2Members.length > 0;
  const allMembers = hasFilteredMembers ? [] : sortedMembers;

  // Debug: Log filtering results in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Row1 members:', row1Members.length);
      console.log('🔍 Row2 members:', row2Members.length);
      console.log('🔍 All members (fallback):', allMembers.length);
      if (allMembers.length > 0) {
        console.log('⚠️ Using fallback: showing all members because position filtering returned empty');
      }
    }
  }, [row1Members.length, row2Members.length, allMembers.length]);

  // Auto-scroll for mobile carousel
  useEffect(() => {
    if (isPausedRow1) return;
    const scrollContainer = scrollContainerRow1Ref.current;
    if (!scrollContainer || row1Members.length === 0 || row1Members.length === 1) return;

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth - 10) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 0.5;
      }
    };

    const interval = setInterval(scroll, 50);
    return () => clearInterval(interval);
  }, [isPausedRow1, row1Members.length]);

  useEffect(() => {
    if (isPausedRow2) return;
    const scrollContainer = scrollContainerRow2Ref.current;
    if (!scrollContainer || row2Members.length === 0 || row2Members.length === 1) return;

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth - 10) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 0.5;
      }
    };

    const interval = setInterval(scroll, 50);
    return () => clearInterval(interval);
  }, [isPausedRow2, row2Members.length]);

  const handleTouchStart = (row: '1' | '2') => {
    if (row === '1') setIsPausedRow1(true);
    else setIsPausedRow2(true);
  };

  const handleTouchEnd = (row: '1' | '2') => {
    setTimeout(() => {
      if (row === '1') setIsPausedRow1(false);
      else setIsPausedRow2(false);
    }, 2000);
  };

  const MemberCard = ({ member }: { member: BoardMember }) => (
    <Card key={member._id} className="bg-surface/10 border-surface/20 hover:bg-surface/20 transition-all duration-300 cursor-pointer shrink-0 w-[280px] md:w-auto" onClick={() => onClick(member)}>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="relative">
            {member.photo?.asset?.url ? (
              <Image src={member.photo.asset.url} alt={member.photo.alt || member.name} width={240} height={240} quality={90} sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" className="rounded-full object-cover border-4 border-primary/20" />
            ) : (
              <div className="w-30 h-30 bg-gray-600 rounded-full flex items-center justify-center border-4 border-primary/20">
                <Users className="h-12 w-12 text-gray-400" />
              </div>
            )}
            <div className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-8 h-8 flex items-center justify-center">
              <Crown className="h-4 w-4" />
            </div>
          </div>
        </div>
        <CardTitle className="text-white text-xl">{member.name}</CardTitle>
        {member.role && (
          <div className="px-3 py-1 bg-gradient-to-r from-primary to-primary/80 text-white text-sm rounded-full font-semibold inline-block">
            {member.role}
          </div>
        )}
      </CardHeader>
      <CardContent className="text-center">
        <div className="text-sm text-gray-400 underline decoration-dotted">Profili görmek için tıkla</div>
      </CardContent>
    </Card>
  );

  return (
    <>
      {/* Row 1: Başkan, Başkan Yardımcısı, Sekreter */}
      {row1Members.length > 0 && (
        <div className="mb-12">
          {/* Desktop: Dynamic Grid */}
          <div className="hidden md:flex justify-center">
            <div 
              className={`grid gap-6`}
              style={{
                gridTemplateColumns: `repeat(${Math.min(row1Members.length, 4)}, 1fr)`,
                maxWidth: '100%',
              }}
            >
              {row1Members.map((member) => (
                <MemberCard key={member._id} member={member} />
              ))}
            </div>
          </div>
          {/* Mobile: Carousel */}
          {row1Members.length === 1 ? (
            <div className="md:hidden pb-4 -mx-4 grid place-items-center">
              <MemberCard key={row1Members[0]._id} member={row1Members[0]} />
            </div>
          ) : (
            <div 
              className="md:hidden flex gap-6 pb-4 scrollbar-hide overflow-x-auto -mx-4 px-4"
              ref={scrollContainerRow1Ref}
              onTouchStart={() => handleTouchStart('1')}
              onTouchEnd={() => handleTouchEnd('1')}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {row1Members.map((member) => (
                <MemberCard key={member._id} member={member} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Row 2: Sayman, Şube Sorumlusu */}
      {row2Members.length > 0 && (
        <div>
          {/* Desktop: Dynamic Grid */}
          <div className="hidden md:flex justify-center">
            <div 
              className={`grid gap-6`}
              style={{
                gridTemplateColumns: `repeat(${Math.min(row2Members.length, 4)}, 1fr)`,
                maxWidth: '100%',
              }}
            >
              {row2Members.map((member) => (
                <MemberCard key={member._id} member={member} />
              ))}
            </div>
          </div>
          {/* Mobile: Carousel */}
          {row2Members.length === 1 ? (
            <div className="md:hidden pb-4 -mx-4 grid place-items-center">
              <MemberCard key={row2Members[0]._id} member={row2Members[0]} />
            </div>
          ) : (
            <div 
              className="md:hidden flex gap-6 pb-4 scrollbar-hide overflow-x-auto -mx-4 px-4"
              ref={scrollContainerRow2Ref}
              onTouchStart={() => handleTouchStart('2')}
              onTouchEnd={() => handleTouchEnd('2')}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {row2Members.map((member) => (
                <MemberCard key={member._id} member={member} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Fallback: Eğer filtreleme sonucu boşsa, tüm üyeleri göster */}
      {allMembers.length > 0 && (
        <div>
          {/* Desktop: Dynamic Grid */}
          <div className="hidden md:flex justify-center">
            <div 
              className={`grid gap-6`}
              style={{
                gridTemplateColumns: `repeat(${Math.min(allMembers.length, 4)}, 1fr)`,
                maxWidth: '100%',
              }}
            >
              {allMembers.map((member) => (
                <MemberCard key={member._id} member={member} />
              ))}
            </div>
          </div>
          {/* Mobile: Carousel */}
          {allMembers.length === 1 ? (
            <div className="md:hidden pb-4 -mx-4 grid place-items-center">
              <MemberCard key={allMembers[0]._id} member={allMembers[0]} />
            </div>
          ) : (
            <div 
              className="md:hidden flex gap-6 pb-4 scrollbar-hide overflow-x-auto -mx-4 px-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {allMembers.map((member) => (
                <MemberCard key={member._id} member={member} />
              ))}
            </div>
          )}
        </div>
      )}

      {selected && (
        <PersonModal person={selected} isOpen={open} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
