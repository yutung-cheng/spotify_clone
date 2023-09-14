"use client";

import SongItem from "@/app/components/SongItem";
import { Song } from "@/types";

interface SearchContentProps {
  songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
  return (
    <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
      {songs.length === 0 ? (
        "No Songs found"
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
          {songs.map((song) => {
            return <SongItem key={song.id} onClick={() => {}} song={song} />;
          })}
        </div>
      )}
    </div>
  );
};

export default SearchContent;
