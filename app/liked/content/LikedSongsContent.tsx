"use client";

import SongItem from "@/app/components/SongItem";
import { LikedSongs } from "@/types";

interface LikedSongsContentProps {
  songs: LikedSongs[];
}

const LikedSongContent: React.FC<LikedSongsContentProps> = ({ songs }) => {
  {
    console.log("songs", songs);
    if (songs.length === 0) {
      return (
        <div className="mt-2 ml-6 text-neutral-400">No songs available</div>
      );
    }
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
        {songs.map((song) => {
          const { songs } = song;

          return <SongItem key={songs.id} onClick={() => {}} song={songs} />;
        })}
      </div>
    );
  }
};

export default LikedSongContent;