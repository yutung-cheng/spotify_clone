"use client";

import { useEffect, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import {
  AiFillStepBackward,
  AiFillStepForward,
} from "react-icons/ai";

import MediaItem from "@/app/components/MediaItem";
import LikedButton from "@/app/components/buttons/LikedButton";
import { Song } from "@/types";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
import Slider from "@/app/components/play/Slider";
import useSound from "use-sound";
import usePlayer from "@/app/hooks/usePlayer";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({
  song,
  songUrl,
}) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  // Play next song method.
  const onPlayNext = () => {
    if (player.ids.length === 0) return;

    const currentIndex = player.ids.findIndex(
      (id) => id === player.activeId
    );
    const nextSong = player.ids[currentIndex + 1];

    // If no next Song, we will jump back to the first song in playlist and replay the song
    if (!nextSong) return player.setId(player.ids[0]);

    player.setId(nextSong);
  };

  // Play previous song method.
  const onPlayPrevious = () => {
    if (player.ids.length === 0) return;

    const currentIndex = player.ids.findIndex(
      (id) => id === player.activeId
    );

    const previousSong = player.ids[currentIndex - 1];
    /// If we are at the beginning of the playlist and want to play previous song
    /// We will jump back to the last song in playlist and replay the song
    if (!previousSong)
      return player.setId(player.ids[player.ids.length - 1]);

    player.setId(previousSong);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  //Automatically play the song when the Play component load.
  useEffect(() => {
    sound?.play();
    return () => {
      sound?.unload();
    };
  }, [sound]);

  //Handle play method
  const handlePlay = () => {
    !isPlaying ? play() : pause();
  };

  const toggleMute = () => {
    setVolume(volume === 0 ? 1 : 0);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="w-full flex justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem song={song!} />
          <LikedButton
            songId={song?.id}
            title={song?.title}
            showUnliked
          />
        </div>
      </div>
      {/* Mobile Mode */}
      <div
        onClick={handlePlay}
        className="flex md:hidden col-auto w-full justify-end items-center">
        <div className="h-10 w-10 flex justify-center rounded-full bg-white p-1 cursor-pointer">
          <Icon size={30} className="text-black" />
        </div>
      </div>
      <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
        <AiFillStepBackward
          onClick={onPlayPrevious}
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
        <div
          onClick={handlePlay}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer">
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          onClick={onPlayNext}
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className=" cursor-pointer"
            size={34}
          />
          <Slider
            value={volume}
            onChange={(value) => setVolume(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
