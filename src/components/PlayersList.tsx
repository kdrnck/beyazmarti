"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import Image from "next/image";
import { PlayerModal } from "@/components/PlayerModal";

interface Player {
  _id: string;
  name: string;
  position?: string;
  number?: number;
  birthYear?: string;
  bio?: string;
  photo?: {
    asset?: {
      _id: string;
      url: string;
    };
    alt?: string;
  };
}

interface PlayersListProps {
  players: Player[];
}

export function PlayersList({ players }: PlayersListProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  return (
    <>
      <Card className="bg-surface/10 border-surface/20">
        <CardHeader>
          <CardTitle className="text-text flex items-center">
            <Users className="h-5 w-5 mr-2 text-primary" />
            Takım Kadrosu ({players.length} oyuncu)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {players.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {players.map((player: Player) => (
                <div 
                  key={player._id} 
                  className="bg-surface/5 rounded-lg p-8 border border-surface/10 hover:bg-surface/10 transition-all duration-300 cursor-pointer group"
                  onClick={() => handlePlayerClick(player)}
                >
                  {/* Oyuncu Fotoğrafı */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      {player.photo?.asset?.url ? (
                        <Image
                          src={player.photo.asset.url}
                          alt={player.photo.alt || player.name}
                          width={320}
                          height={320}
                          quality={90}
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          className="rounded-full object-cover border-4 border-primary/20 group-hover:border-primary/40 transition-colors"
                        />
                      ) : (
                        <div className="w-40 h-40 bg-gray-600 rounded-full flex items-center justify-center border-4 border-primary/20 group-hover:border-primary/40 transition-colors">
                          <Users className="h-16 w-16 text-gray-400" />
                        </div>
                      )}
                      {player.number && (
                        <div className="absolute -top-3 -right-3 bg-primary text-white text-lg rounded-full w-10 h-10 flex items-center justify-center font-bold">
                          {player.number}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Oyuncu Bilgileri */}
                  <div className="text-center">
                    <h4 className="font-semibold text-white text-lg mb-3 group-hover:text-accent transition-colors">
                      {player.name}
                    </h4>
                    {player.position && (
                      <div className="px-3 py-1 bg-gradient-to-r from-primary to-primary/80 text-white text-sm rounded-full font-medium inline-block mb-2">
                        {player.position}
                      </div>
                    )}
                    {player.birthYear && (
                      <div className="px-3 py-1 bg-gradient-to-r from-accent to-accent/80 text-white text-sm rounded-full font-medium inline-block">
                        {player.birthYear}
                      </div>
                    )}
                    {player.bio && (
                      <div className="mt-3 text-sm text-gray-400 underline decoration-dotted">Biyografiyi görmek için tıkla</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">Bu takımın oyuncu profilleri henüz yüklenmedi.</p>
              <p className="text-sm text-gray-500 mt-2">Admin panelinden oyuncu profilleri yüklendikten sonra burada görünecek.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Player Modal */}
      {selectedPlayer && (
        <PlayerModal
          player={selectedPlayer}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
