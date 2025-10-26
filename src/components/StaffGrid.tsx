"use client";

import { useState } from "react";
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
  photo?: { asset?: { url: string }, alt?: string };
}

export function StaffGrid({ staff }: { staff: StaffMember[] }) {
  const [selected, setSelected] = useState<StaffMember | null>(null);
  const [open, setOpen] = useState(false);

  const onClick = (m: StaffMember) => {
    setSelected(m);
    setOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((member) => (
          <Card key={member._id} className="bg-surface/10 border-surface/20 hover:bg-surface/20 transition-all duration-300 cursor-pointer" onClick={() => onClick(member)}>
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
        ))}
      </div>

      {selected && (
        <PersonModal person={selected} isOpen={open} onClose={() => setOpen(false)} />
      )}
    </>
  );
}


