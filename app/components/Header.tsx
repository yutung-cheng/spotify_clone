"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import CustomButton from "./CustomButton";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();

  const handleLogout = () => {
    // Handle logout later
  };

  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-emerald-800 p-6`,
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        {/* Web Mode */}
        <div className="hidden md:flex gap-x-2 items-center">
          {/* < button for Web mode */}
          <button
            onClick={() => router.back()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-60 transition"
          >
            <RxCaretLeft size={35} className="text-white" />
          </button>

          {/* > button for Web mode */}
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-60 transition"
          >
            <RxCaretRight size={35} className="text-white" />
          </button>
        </div>

        {/* Mobile Mode.... */}
        <div className="flex md:hidden gap-x-2 items-center">
          {/* Home Button for Mobile mode */}
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <HiHome className="text-black" size={20} />
          </button>
          {/* Search button for Mobile mode */}
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div className="flex justify-center items-center gap-x-4">
          <>
            {/* Custom Button component - Sign up */}
            <div>
              <CustomButton
                onClick={() => {
                  //Sign up
                }}
                className="bg-transparent text-neutral-300 font-medium"
              >
                Sign up
              </CustomButton>
            </div>
            {/* Custom Button component - Log in */}
            <div>
              <CustomButton
                onClick={() => {
                  //Log in
                }}
                className="bg-white px-6 py-2"
              >
                Log in
              </CustomButton>
            </div>
          </>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
