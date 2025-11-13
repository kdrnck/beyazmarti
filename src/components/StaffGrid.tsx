"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Award, Star } from "lucide-react";
import Image from "next/image";
import { PersonModal } from "@/components/sections/PersonModal";

interface StaffMember {
  _id: string;
  name: string;
  role?: string;
  bio?: string;
  experience?: string;
  certifications?: string[];
  section?: string;
  photo?: { asset?: { url: string }, alt?: string };
}

const sectionNames: Record<string, string> = {
  'bas-antrenor': 'Baş Antrenör',
  'koordinator': 'Koordinatör',
  'antrenor': 'Antrenör',
  'yardimci-antrenor': 'Yardımcı Antrenör',
};

const sectionOrder = ['bas-antrenor', 'koordinator', 'antrenor', 'yardimci-antrenor'];

export function StaffGrid({ staff }: { staff: StaffMember[] }) {
  const [selected, setSelected] = useState<StaffMember | null>(null);
  const [open, setOpen] = useState(false);
  const pauseStates = useRef<Record<string, boolean>>({});
  const intervalRefs = useRef<Record<string, NodeJS.Timeout | null>>({});
  const resumeTimeoutRefs = useRef<Record<string, NodeJS.Timeout | null>>({});

  const onClick = (m: StaffMember) => {
    setSelected(m);
    setOpen(true);
  };

  // Group staff by section
  const staffBySection = useMemo(() => {
    return sectionOrder.reduce((acc, section) => {
      acc[section] = staff.filter((s) => s.section === section);
      return acc;
    }, {} as Record<string, StaffMember[]>);
  }, [staff]);

  const clearAutoScroll = useCallback((section: string) => {
    const interval = intervalRefs.current[section];
    if (interval) {
      clearInterval(interval);
      intervalRefs.current[section] = null;
    }
  }, []);

  const clearResumeTimeout = useCallback((section: string) => {
    const timeout = resumeTimeoutRefs.current[section];
    if (timeout) {
      clearTimeout(timeout);
      resumeTimeoutRefs.current[section] = null;
    }
  }, []);

  const startAutoScroll = useCallback((section: string) => {
    const members = staffBySection[section];
    if (!members || members.length <= 1) return;

    const scrollContainer = document.getElementById(`staff-carousel-${section}`);
    if (!scrollContainer) return;

    clearAutoScroll(section);

    const scroll = () => {
      if (pauseStates.current[section]) {
        return;
      }

      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth - 10) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 0.5;
      }
    };

    intervalRefs.current[section] = setInterval(scroll, 50);
  }, [clearAutoScroll, staffBySection]);

  // Auto-scroll for mobile carousels
  useEffect(() => {
    sectionOrder.forEach((section) => startAutoScroll(section));

    return () => {
      sectionOrder.forEach((section) => clearAutoScroll(section));
      sectionOrder.forEach((section) => clearResumeTimeout(section));
    };
  }, [clearAutoScroll, clearResumeTimeout, startAutoScroll]);

  const handleInteractionStart = (section: string) => {
    pauseStates.current[section] = true;
    clearAutoScroll(section);
    clearResumeTimeout(section);
  };

  const handleInteractionEnd = (section: string) => {
    clearResumeTimeout(section);
    resumeTimeoutRefs.current[section] = setTimeout(() => {
      pauseStates.current[section] = false;
      startAutoScroll(section);
      resumeTimeoutRefs.current[section] = null;
    }, 3000);
  };

  const StaffCard = ({ member }: { member: StaffMember }) => (
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
              <Award className="h-4 w-4" />
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
      <CardContent className="text-center space-y-2">
        {member.experience && (
          <div className="text-xs text-gray-300">
            <span className="text-text font-medium">Deneyim:</span> {member.experience}
          </div>
        )}
        <div className="text-sm text-gray-400 underline decoration-dotted">Profili görmek için tıkla</div>
      </CardContent>
    </Card>
  );

  return (
    <>
      {sectionOrder.map((section) => {
        const members = staffBySection[section];
        if (!members || members.length === 0) return null;

        return (
          <div key={section} className="mb-12">
            <h3 className="font-heading font-bold text-2xl text-text mb-6 text-center">
              {sectionNames[section]}
            </h3>
            {/* Desktop: Dynamic Grid */}
            <div className="hidden md:flex justify-center">
              <div 
                className={`grid gap-6`}
                style={{
                  gridTemplateColumns: `repeat(${Math.min(members.length, 4)}, 1fr)`,
                  maxWidth: '100%',
                }}
              >
                {members.map((member) => (
                  <StaffCard key={member._id} member={member} />
                ))}
              </div>
            </div>
            {/* Mobile: Carousel */}
            {members.length === 1 ? (
              <div className="md:hidden pb-4 -mx-4 grid place-items-center">
                <StaffCard key={members[0]._id} member={members[0]} />
              </div>
            ) : (
              <div 
                id={`staff-carousel-${section}`}
                className="md:hidden flex gap-6 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4"
                onTouchStart={() => handleInteractionStart(section)}
                onTouchEnd={() => handleInteractionEnd(section)}
                onPointerDown={() => handleInteractionStart(section)}
                onPointerUp={() => handleInteractionEnd(section)}
                onPointerCancel={() => handleInteractionEnd(section)}
                onPointerLeave={() => handleInteractionEnd(section)}
                onWheel={() => {
                  handleInteractionStart(section);
                  handleInteractionEnd(section);
                }}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {members.map((member) => (
                  <StaffCard key={member._id} member={member} />
                ))}
              </div>
            )}
          </div>
        );
      })}

      {selected && (
        <PersonModal person={selected} isOpen={open} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
