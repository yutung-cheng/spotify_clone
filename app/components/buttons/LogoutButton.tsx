import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import CustomButton from "../CustomButton";
import toast from "react-hot-toast";

const LogoutButton: React.FC = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    // TODO: Reseat any playing songs.
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out!");
    }
  };

  return (
    <div className="flex gap-x-4 items-center">
      <CustomButton onClick={handleLogout} className="bg-white px-6 py-2">
        Logout
      </CustomButton>
    </div>
  );
};

export default LogoutButton;
