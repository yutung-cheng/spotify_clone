"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname();
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
  return <div className="flex h-full">Sidebar! </div>;
};

export default Sidebar;
