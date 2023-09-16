"use client";

import { Song } from "@/types";
import useGetSongById from "../hooks/useGetSongById";
import usePlayer from "../hooks/usePlayer";
import useLoadSongUrl from "../hooks/useLoadSongUrl";
import PlayerContent from "./content/PlayerContent";

interface PlayerProps {}

const Player: React.FC<PlayerProps> = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);

  const songUrl = useLoadSongUrl(song!);

  if (!song || !songUrl || !player.activeId) {
    console.log("null", song, songUrl, player.activeId);

    return null;
  }

  return (
    <div className="justify-evenly  bottom-0 bg-black w-full py-2 px-4 h-[80px]">
      <PlayerContent key={songUrl} song={song!} songUrl={songUrl} />
    </div>
  );
};

export default Player;
