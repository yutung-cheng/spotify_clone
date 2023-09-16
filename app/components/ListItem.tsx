"use client";

import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";
import Image from "next/image";
import { useUser } from "../hooks/useUser";
import useAuthModal from "../hooks/useAuthModal";
import { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { Song } from "@/types";
import usePlayer from "../hooks/usePlayer";

interface ListItemProps {
  songs: Song[];
  image: string;
  name: string;
  href: string;
}

const ListItem: React.FC<ListItemProps> = ({
  songs,
  image,
  name,
  href,
}) => {
  const router = useRouter();
  const { user } = useUser();
  const authModal = useAuthModal();
  const { session } = useSessionContext();
  const player = usePlayer();

  const [isClicked, setIsClicked] = useState(false);
  const [logedIn, setLogedIn] = useState(false);

  const handleClick = () => player.setId(songs[0].id);

  const onClick = () => {
    setIsClicked(true);
    console.log("isClicked", isClicked);

    //Add authentication before push
    if (!user) {
      //If not log in, trigger log in dialog.
      authModal.onOpen();
    } else {
      console.log("We are here 2");

      setIsClicked(false);
      router.push(href);
    }
  };

  useEffect(() => {
    if (session && isClicked) {
      setLogedIn(true);
    } else {
      setLogedIn(false);
    }
    if (logedIn && isClicked) {
      setIsClicked(false);
      router.push(href);
    }
  }, [isClicked, session, logedIn, router, href]);

  return (
    <button className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4">
      <div onClick={onClick} className="flex flex-row">
        <div className="relative min-h-[64px] min-w-[64px]">
          {/* This Image is imported from `next/Image` library. */}
          <Image
            className="object-cover"
            priority
            fill
            src={image}
            alt="Image"
            sizes="100%"
          />
        </div>
        <p className="pl-3 font-medium truncate py-5">{name}</p>
      </div>
      <div
        onClick={!user ? onClick : handleClick}
        className="absolute transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-3 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110">
        <FaPlay className="text-black" />
      </div>
    </button>
  );
};

export default ListItem;
