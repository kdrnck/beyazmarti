"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase } from "lucide-react";
import Image from "next/image";
import { PersonModal } from "@/components/sections/PersonModal";

interface ExecutiveBoardMember {
  _id: string;
  name: string;
  role?: string;
  bio?: string;
  layoutSize?: string;
  order?: number;
  photo?: { asset?: { url: string }, alt?: string };
}

export function ExecutiveBoardGrid({ members }: { members: ExecutiveBoardMember[] }) {
  const [selected, setSelected] = useState<ExecutiveBoardMember | null>(null);
  const [open, setOpen] = useState(false);

  const onClick = (m: ExecutiveBoardMember) => { setSelected(m); setOpen(true); };

  // Sanity'den zaten order'a göre sıralı geliyor
  const sortedMembers = members;

  const MemberCard = ({ member }: { member: ExecutiveBoardMember }) => {
    // 1x1 = küçük kart (1 birim), 2x2 = büyük kart (2 birim)
    const is2x2 = member.layoutSize === '2x2';

    return (
      <Card 
        key={member._id} 
        className="bg-surface/10 border-surface/20 hover:bg-surface/20 transition-all duration-300 cursor-pointer h-full"
        onClick={() => onClick(member)}
      >
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              {member.photo?.asset?.url ? (
                <Image 
                  src={member.photo.asset.url} 
                  alt={member.photo.alt || member.name} 
                  width={240} 
                  height={240} 
                  quality={90} 
                  sizes="(max-width: 1023px) 50vw, (max-width: 1279px) 220px, 280px" 
                  className={`rounded-full object-cover border-4 border-primary/20 ${
                    is2x2 ? 'w-[180px] h-[180px] lg:w-[240px] lg:h-[240px]' : 'w-[160px] h-[160px] lg:w-[200px] lg:h-[200px]'
                  }`}
                />
              ) : (
                <div 
                  className={`bg-gray-600 rounded-full flex items-center justify-center border-4 border-primary/20 ${
                    is2x2 ? 'w-[180px] h-[180px] lg:w-[240px] lg:h-[240px]' : 'w-[160px] h-[160px] lg:w-[200px] lg:h-[200px]'
                  }`}
                >
                  <Users className="h-12 w-12 text-gray-400" />
                </div>
              )}
              <div className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-8 h-8 flex items-center justify-center">
                <Briefcase className="h-4 w-4" />
              </div>
            </div>
          </div>
          <CardTitle className={`text-white ${is2x2 ? 'text-xl lg:text-2xl' : 'text-lg lg:text-xl'}`}>
            {member.name}
          </CardTitle>
          {member.role && (
            <div className="px-3 py-1 bg-gradient-to-r from-primary to-primary/80 text-white text-xs lg:text-sm rounded-full font-semibold inline-block mt-2">
              {member.role}
            </div>
          )}
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-xs lg:text-sm text-gray-400 underline decoration-dotted">Profili görmek için tıkla</div>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      {/* Desktop: Flex wrap with dynamic sizing (1x1 = 1 unit, 2x2 = 2 units) */}
      <div className="hidden md:flex flex-wrap justify-center gap-4 md:gap-6 mx-auto max-w-[1280px] px-4">
        {sortedMembers.map((member) => {
          const is2x2 = member.layoutSize === '2x2';
          // Desktop: 1x1 = 280px, 2x2 = 584px
          // Tablet (md): 1x1 = 220px, 2x2 = 460px
          const cardWidth = is2x2 
            ? 'w-[460px] lg:w-[584px]' 
            : 'w-[220px] lg:w-[280px]';
          
          return (
            <div key={member._id} className={`${cardWidth} flex-shrink-0`}>
              <MemberCard member={member} />
            </div>
          );
        })}
      </div>

      {/* Mobile: Simple vertical stack */}
      <div className="md:hidden flex flex-col gap-6 max-w-md mx-auto">
        {sortedMembers.map((member) => (
          <Card 
            key={member._id} 
            className="bg-surface/10 border-surface/20 hover:bg-surface/20 transition-all duration-300 cursor-pointer"
            onClick={() => onClick(member)}
          >
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  {member.photo?.asset?.url ? (
                    <Image 
                      src={member.photo.asset.url} 
                      alt={member.photo.alt || member.name} 
                      width={200} 
                      height={200} 
                      quality={90} 
                      className="rounded-full object-cover border-4 border-primary/20" 
                    />
                  ) : (
                    <div className="w-[200px] h-[200px] bg-gray-600 rounded-full flex items-center justify-center border-4 border-primary/20">
                      <Users className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-8 h-8 flex items-center justify-center">
                    <Briefcase className="h-4 w-4" />
                  </div>
                </div>
              </div>
              <CardTitle className="text-white text-xl">{member.name}</CardTitle>
              {member.role && (
                <div className="px-3 py-1 bg-gradient-to-r from-primary to-primary/80 text-white text-sm rounded-full font-semibold inline-block mt-2">
                  {member.role}
                </div>
              )}
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-sm text-gray-400 underline decoration-dotted">Profili görmek için tıkla</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selected && (
        <PersonModal person={selected} isOpen={open} onClose={() => setOpen(false)} />
      )}
    </>
  );
}

