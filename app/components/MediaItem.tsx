"use client";

import { Song } from "@/types";

interface MediaItemProps {
  song: Song;
  onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ song, onClick }) => {
  return <div>MediaItem</div>;
};

export default MediaItem;
