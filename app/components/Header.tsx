"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";

import useAuthModal from "../hooks/useAuthModal";
import { useUser } from "../hooks/useUser";
import SignUpButton from "./buttons/SignUpButton";
import LogInButton from "./buttons/LogInButton";
import LogoutButton from "./buttons/LogoutButton";
import CustomButton from "./CustomButton";
import { FaUserAlt } from "react-icons/fa";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  // Add our auth modal here.
  const authModal = useAuthModal();

  const router = useRouter();

  //Extract the user from OUR useUser Hook.
  const { user, subscription } = useUser();

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
          {/* If the user is logged in, we show `Log out` button.
           * Otherwise, we show `Login` and `Sign up` buttons.
           */}
          {user ? (
            <>
              {/* Custom Button component - Logout */}
              <LogoutButton />

              {/* Setting button */}
              <CustomButton
                onClick={() => {
                  router.push("/account");
                }}
                className="bg-white px-3 py-3"
              >
                <FaUserAlt />
              </CustomButton>
            </>
          ) : (
            <>
              {/* Custom Button component - Sign up */}
              <SignUpButton />
              {/* Custom Button component - Log in */}
              <LogInButton />
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
