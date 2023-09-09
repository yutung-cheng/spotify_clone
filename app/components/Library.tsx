"use client";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
interface LibraryProps {}

const Library: React.FC<LibraryProps> = () => {
  const onClick = () => {
    // Handle Upload later.
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-netrual-400" size={26} />
          <p className="text-netrual-400 font-medium text-md">Your Library</p>
        </div>{" "}
        <AiOutlinePlus onClick={onClick} />
      </div>
    </div>
  );
};

export default Library;
