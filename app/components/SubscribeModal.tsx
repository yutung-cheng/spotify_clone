"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { Price, ProductWithPrice } from "@/types";
import Modal from "./Modal";
import CustomButton from "./CustomButton";
import { useUser } from "../hooks/useUser";
import { postData } from "@/libs/helpers";
import { getStripe } from "@/libs/stripeClient";

interface SubscribeModalProps {
  products: ProductWithPrice[];
}

const formatPrice = (price: Price) => {
  const priceString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100);

  return priceString;
};

const SubscribeModal: React.FC<SubscribeModalProps> = ({
  products,
}) => {
  const { user, isLoading, subscription } = useUser();

  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading(undefined);
      return toast.error("Please login first");
    }

    if (subscription) {
      setPriceIdLoading(undefined);
      return toast("Already subscribed");
    }

    try {
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: {
          price,
        },
      });
      const stripe = await getStripe();
      // Create a custom checkout screen for the currently logged in user.
      stripe?.redirectToCheckout({ sessionId });
    } catch (e) {
      toast.error((e as Error)?.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  let content = (
    <div className="text-center">No Products Available.</div>
  );

  if (products.length) {
    content = (
      <div>
        {products.map((product) => {
          if (!product.prices?.length) {
            return <div key={product.id}>No Prices available</div>;
          }
          return product.prices.map((price) => (
            <CustomButton
              key={price.id}
              onClick={() => handleCheckout(price)}
              disabled={isLoading || price.id === priceIdLoading}
              className="mb-4">
              {`Subscribe for ${formatPrice(price)} a ${
                price.interval
              }`}
            </CustomButton>
          ));
        })}
      </div>
    );
  }

  if (subscription) {
    content = <div className="text-center">Already subscribed.</div>;
  }

  return (
    <Modal
      title="Only for premium users."
      description="Listen to music with Spotify Premium."
      isOpen
      onChange={() => {}}>
      {content}
    </Modal>
  );
};

export default SubscribeModal;
