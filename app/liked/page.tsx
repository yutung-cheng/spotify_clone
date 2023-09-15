import getLikedSongs from "@/app/actions/getLikedSongs";
import Header from "../components/Header";
import LikedSongContent from "./content/LikedSongsContent";
import Image from "next/image";

export const revalidate = 0;

const LikedSongs = async () => {
  const songs = await getLikedSongs();

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mt-10">
          <div className="flex flex-row md:flex-row sm:flex-row items-center gap-x-5">
            <div className=" bg-red-600 relative aspect-square h-16 w-16 lg:h-32 lg:w-32 md:h-24 md:w-24 sm:h-24 sm:w-24">
              <Image
                priority
                fill
                src="/images/liked.png"
                alt="Playlist"
                sizes="100%"
              />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p className="hidden md:block font-semibold text-sm">
                Playlist
              </p>
              <h1 className="text-white text-3xl sm:text-4xl lg:text-6xl font-bold">
                Liked Songs
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <LikedSongContent songs={songs} />
    </div>
  );
};

export default LikedSongs;
