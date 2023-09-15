"use client";

import SongItem from "@/app/components/SongItem";
import { useUser } from "@/app/hooks/useUser";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface LikedSongsContentProps {
  songs: Song[];
}

const LikedSongContent: React.FC<LikedSongsContentProps> = ({
  songs,
}) => {
  const router = useRouter();
  const { isLoading, user } = useUser();

  useEffect(() => {
    // Logout will automatically back to home page.
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  {
    if (songs.length === 0) {
      return (
        <div className="mt-2 ml-6 text-neutral-400">
          No songs available
        </div>
      );
    }
    return (
      <div
        className="px-6
        grid 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-3 
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-8
        gap-4 mt-4">
        {songs.map((song) => {
          return (
            <SongItem key={song.id} onClick={() => {}} song={song} />
          );
        })}
      </div>
    );
  }
};

export default LikedSongContent;
