import Image from "next/image";
import Header from "../components/Header";
import ListItem from "../components/ListItem";
import getSongs from "../actions/getSongs";
import PageContent from "./content/PageContent";
import getLikedSongs from "../actions/getLikedSongs";

// This page will not be catch, and the data will always be up-to-date.
export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();
  const likedSongs = await getLikedSongs();

  return (
    <div className="h-full w-full bg-neutral-900 rounded-lg overflow-hidden overflow-y-auto ">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">
            Welcome Back
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItem
              songs={likedSongs}
              name="Liked Songs"
              image="/images/liked.png"
              href="liked"
            />
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">
            New Songs
          </h1>
        </div>
        <PageContent songs={songs} />
      </div>
    </div>
  );
}
