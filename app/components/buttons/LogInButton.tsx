"use client";

import useAuthModal from "@/app/hooks/useAuthModal";
import CustomButton from "../CustomButton";

const LogInButton: React.FC = () => {
  const authModal = useAuthModal();
  return (
    <div>
      <CustomButton
        onClick={authModal.onOpen}
        className="bg-white px-6 py-2">
        Log in
      </CustomButton>
    </div>
  );
};

export default LogInButton;
