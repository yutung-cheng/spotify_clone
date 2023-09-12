import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getSongByUserId = async (): Promise<Song[]> => {
  //Create the server component supabase client
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.log("SessionError", sessionError.message);
    return [];
  }

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("user_id", sessionData.session?.user.id)
    .order("id", { ascending: true });

  if (error) {
    console.log("Get Song By Id Error", error.message);
  }

  return (data as any) || [];
};

export default getSongByUserId;
