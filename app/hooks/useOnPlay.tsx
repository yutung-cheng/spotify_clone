import { Song } from "@/types";
import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";
import toast from "react-hot-toast";
import useSubscribeModal from "./useSubscribeModal";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const subscribeModal = useSubscribeModal();
  const { user, subscription } = useUser();

  const onPlay = (id: string) => {
    if (!user) {
      //Non-login user popup loging dialog.
      return authModal.onOpen();
    }

    if (!subscription) {
      return subscribeModal.onOpen();
    }
    //play the current song while we clicked on.
    player.setId(id);
    //but also create a playlist of all the songs that user clicked.
    player.setIds(songs.map((song) => song.id));
    toast.success("Add to playlist!");
  };

  return onPlay;
};

export default useOnPlay;
