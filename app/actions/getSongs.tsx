import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getSongs = async (): Promise<Song[]> => {
  //Create the server component supabase client
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  // Fetch our songs.
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .order("id", { ascending: true });

  //Check if errors.
  if (error) {
    console.log("Error Fetching Data", error);
  }

  return (data as any) || [];
};

export default getSongs;
