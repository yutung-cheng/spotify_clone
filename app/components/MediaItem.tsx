"use client";
import Image from "next/image";

import { Song } from "@/types";
import useLoadImage from "../hooks/useLoadImage";

interface MediaItemProps {
  song: Song;
  onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ song, onClick }) => {
  const imagePath = useLoadImage(song);

  const handleClick = () => {
    if (onClick) return song.id;

    // TODO: Default turn on player
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-x-3 cursor-pointer hover:bg-ne-800/50 w-full p-2 rounded-md"
    >
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image
          src={imagePath || "/images/liked.png"}
          fill
          sizes="100%"
          className="obeject-cover"
          alt="Media Item Image"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="truncate text-white">{song.title}</p>
        <p className="text-neutral-400 text-sm truncate">{song.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;
