"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

// Define a type for the game data structure
type Game = {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
};

// Sample data for the games
const games: Game[] = [
  {
    id: 1,
    title: "Hollow Knight",
    imageUrl:
      "https://unity.com/sites/default/files/styles/16_9_m_scale_width/public/article/2%20col_0.png?itok=-UxoE5DG",
    description: "Description for game one.",
  },
  {
    id: 2,
    title: "Game Two",
    imageUrl: "/path/to/image2.jpg",
    description: "Description for game two.",
  },
  {
    id: 3,
    title: "Game Three",
    imageUrl: "/path/to/image3.jpg",
    description: "Description for game three.",
  },
  {
    id: 4,
    title: "Game Four",
    imageUrl: "/path/to/image4.jpg",
    description: "Description for game four.",
  },
];

const GameCard: React.FC<{ game: Game }> = ({ game }) => {
  const router = useRouter();
  const handleCardClick = () => {
    router.push(`/challenges`);
  };

  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg bg-[#121212] m-4 cursor-pointer 
                 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
      onClick={handleCardClick}
    >
      <Image
        className="w-full max-h-52"
        src={game.imageUrl}
        alt={`Cover for ${game.title}`}
        height="300"
        width="300"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-white">{game.title}</div>
        <p className="text-white text-base">{game.description}</p>
      </div>
    </div>
  );
};

const GamesPage: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center items-center min-h-screen bg-[#23252A]">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default GamesPage;
