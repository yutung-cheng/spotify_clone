import getLikedSongs from "@/app/actions/getLikedSongs";
import Header from "../components/Header";
import { SearchInput } from "../components/SearchInput";
import MediaItem from "../components/MediaItem";
import LikedSongContent from "./content/LikedSongsContent";

const LikedSongs = async () => {
  const songs = await getLikedSongs();

  return (
    <div className="text-white bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">Liked Songs</h1>
        </div>
      </Header>
      <LikedSongContent songs={songs} />
    </div>
  );
};

export default LikedSongs;
