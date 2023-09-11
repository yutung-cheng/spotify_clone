"use client";

import useAuthModal from "@/app/hooks/useAuthModal";
import CustomButton from "../CustomButton";

const SignUpButton: React.FC = () => {
  const authModal = useAuthModal();

  return (
    <div>
      <CustomButton
        onClick={authModal.onOpen}
        className="bg-transparent text-neutral-300 font-medium"
      >
        Sign up
      </CustomButton>
    </div>
  );
};

export default SignUpButton;
