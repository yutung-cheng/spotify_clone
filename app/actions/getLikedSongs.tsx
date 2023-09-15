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

  console.log("data", data);

  if (error) {
    console.log("Error Fetching Data", error);
  }

  return (data as any) || [];
};

export default getLikedSongs;