import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getLikedSongs = async () => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, error } = await supabase
    .from("liked_songs")
    .select("*, songs(*)") //Connect to songs
    .eq("user_id", session?.user?.id)
    .order("created_at", { ascending: true });

  if (error) {
    console.log("Error Fetching Data", error);
    return [];
  }

  if (!data) return [];

  return data.map((likedSong) => ({
    ...likedSong.songs,
  }));
};

export default getLikedSongs;
