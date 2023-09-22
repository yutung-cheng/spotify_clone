"use client";

import CustomButton from "@/app/components/CustomButton";
import useSubscribeModal from "@/app/hooks/useSubscribeModal";
import { useUser } from "@/app/hooks/useUser";
import { postData } from "@/libs/helpers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AccountContent: React.FC = () => {
  const router = useRouter();
  const subscribeModal = useSubscribeModal();
  const { isLoading, subscription, user } = useUser();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, router, user]);

  const redirectToCustomerPortal = async () => {
    setLoading(true);
    try {
      const { url, error } = await postData({
        url: "/api/create-portal-link",
      });
      window.location.assign(url);
    } catch (error) {
      if (error) {
        toast.error((error as Error)?.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="mb-7 px-6">
      {!subscription && (
        <div className="flex flex-col gap-y-4">
          <p>No active plan</p>
          <CustomButton
            onClick={subscribeModal.onOpen}
            className="w-[300px]">
            Subscribe
          </CustomButton>
        </div>
      )}
      {subscription && (
        <div className="flex flex-col gap-y-4">
          <p>
            You are currently on the{" "}
            <b>{subscription?.prices?.products?.name}</b> plan
          </p>
          <CustomButton
            disabled={loading || isLoading}
            onClick={redirectToCustomerPortal}
            className="w-[300px]">
            Open customer portal
          </CustomButton>
        </div>
      )}
    </div>
  );
};

export default AccountContent;
