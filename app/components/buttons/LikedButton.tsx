"use client";

import { useRouter } from "next/navigation";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { useUser } from "@/app/hooks/useUser";

interface LikedButtonProps {
  songId: string;
  title: string;
}

const LikedButton: React.FC<LikedButtonProps> = ({
  songId,
  title,
}) => {
  //get router.
  const router = useRouter();

  //get supabase Client.
  const { supabaseClient } = useSessionContext();

  //get user info.
  const { user } = useUser();

  //create liked state
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Not Login
    if (!user?.id) {
      setIsLiked(false);
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .maybeSingle(); //Return data as a single object instead of an array

      if (!error && data) setIsLiked(true);
      if (error) {
        console.log("error", error.message);
      }
    };

    // Execute.
    fetchData();
  }, [songId, supabaseClient, user?.id]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user!.id)
        .eq("song_id", songId);
      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
        toast.success(`${title} Removed!`);
      }
    }

    if (!isLiked && user) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .insert({
          song_id: songId,
          user_id: user.id,
          title: title,
        })
        .maybeSingle();

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
        toast.success(`${title} Liked!`);
      }
    }

    router.refresh();
  };

  return !user ? null : (
    <button
      onClick={handleLike}
      className="hover:opacity-75 transition">
      <Icon color={isLiked ? "#22c55e" : "white"} size={26} />
    </button>
  );
};

export default LikedButton;
