"use client";

import MediaItem from "@/app/components/MediaItem";
import LikedButton from "@/app/components/buttons/LikedButton";
import useOnPlay from "@/app/hooks/useOnPlay";
import { Song } from "@/types";

interface SearchContentProps {
  songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);
  return (
    <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
      {songs.length === 0
        ? "No Songs found"
        : songs.map((song) => {
            return (
              <div
                key={song.id}
                className="flex items-center gap-x-4 w-full">
                <div className="flex-1">
                  <MediaItem
                    onClick={(id: string) => {
                      onPlay(id);
                    }}
                    song={song}
                  />
                </div>
                <LikedButton
                  title={song.title}
                  songId={song.id}
                  showUnliked
                />
              </div>
            );
          })}
    </div>
  );
};

export default SearchContent;
