"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";

import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { Song } from "@/types";
import { twMerge } from "tailwind-merge";
import usePlayer from "../hooks/usePlayer";
import { useUser } from "../hooks/useUser";

interface SidebarProps {
  children: React.ReactNode;
  songs: Song[];
}

const Sidebar: React.FC<SidebarProps> = ({ children, songs }) => {
  const pathname = usePathname();
  const player = usePlayer();
  const { user } = useUser();
  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search", // active everytime when the route is not 'search'.
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search", // active everytime when the route is not 'search'.
        href: "/search",
      },
    ],
    [pathname]
  );
  return (
    <div
      className={twMerge(
        `flex h-full`,
        user && player.activeId && "h-[calc(100%-80px)]"
      )}>
      {/* Left part */}
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => {
              //...
              return <SidebarItem key={item.label} {...item} />;
            })}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>
      </div>
      {/* Right Part */}
      <main className="flex-1 overflow-y-auto pr-2 py-2">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
