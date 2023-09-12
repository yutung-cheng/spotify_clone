"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import uniqid from "uniqid";

import useUploadModal from "../hooks/useUploadModal";
import CustomButton from "./CustomButton";
import { useUser } from "../hooks/useUser";
import Modal from "./Modal";
import Input from "./Input";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const UploadModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      //Reset the form when it's called.
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    //Upload to supabase.
    try {
      setIsLoading(true);

      const songFile = values.song?.[0];
      const imageFile = values.image?.[0];

      // If missing image or song or not login, toast error.
      if (!songFile || !imageFile || !user) {
        toast.error("Missing Fields");
        return;
      }

      // Safely upload our song required a unique ID.
      const uniqueID = uniqid();

      //Upload song
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false); //Break the entire function.
        return toast.error("Failed song upload");
      }

      //Upload image
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false); //Break the entire function.
        return toast.error("Failed image upload");
      }

      // Create a record in our database.
      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          song_path: songData.path,
          image_path: imageData.path,
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      //If everything went correctly...
      router.refresh();
      setIsLoading(false);
      toast.success("Song Created");
      reset(); // Reset the entire form.
      uploadModal.onClose(); //Remember to clsoe the dialog.

      //Catch error
    } catch (e) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add songs"
      description="Upload music"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          placeholder="Song Title"
          {...register("title", { required: true })}
        />
        <Input
          id="author"
          disabled={isLoading}
          placeholder="Song Author"
          {...register("author", { required: true })}
        />
        <div>
          <div className="pd-1">Select a song file</div>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3" //Only accept mp3 file.
            {...register("song", { required: true })}
          />
        </div>

        <div>
          <div className="pd-1">Select an image</div>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*" //Only accept mp3 file.
            {...register("image", { required: true })}
          />
        </div>
        <CustomButton disabled={isLoading} type="submit">
          Create
        </CustomButton>
      </form>
    </Modal>
  );
};

export default UploadModal;
