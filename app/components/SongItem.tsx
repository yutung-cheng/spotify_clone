"use client";

import Image from "next/image";

import { Song } from "@/types";
import useLoadImage from "../hooks/useLoadImage";
import PlayButton from "./buttons/PlayButton";

interface SongItemProps {
  song: Song;
  onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({ song, onClick }) => {
  const imagePath = useLoadImage(song);

  return (
    <div
      onClick={() => {
        console.log("song author", song.author);
      }}
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3"
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          className="object-cover"
          fill
          sizes="100%"
          src={imagePath || "/images/liked.png"}
          alt="image"
        />
      </div>
      <div className="flex flex-col items-start w-full gap-y-1 pt-4">
        <p className="font-semibold truncate w-full">{song.title}</p>
        <p className="text-sm text-neutral-400 truncate w-full pb-4">
          {song.author}
        </p>
      </div>
      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
