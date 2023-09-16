"use client";

import { Song } from "@/types";
import useGetSongById from "../hooks/useGetSongById";
import usePlayer from "../hooks/usePlayer";
import useLoadSongUrl from "../hooks/useLoadSongUrl";
import PlayerContent from "./content/PlayerContent";
import {
  useSessionContext,
  useUser,
} from "@supabase/auth-helpers-react";

const Player: React.FC = () => {
  const player = usePlayer();
  const user = useUser();
  const { song } = useGetSongById(player.activeId);

  const songUrl = useLoadSongUrl(song!);

  if (!song || !songUrl || !player.activeId || !user?.id) {
    return null;
  }

  return (
    <div className="justify-evenly  bottom-0 bg-black w-full py-2 px-4 h-[80px]">
      <PlayerContent key={songUrl} song={song!} songUrl={songUrl} />
    </div>
  );
};

export default Player;
