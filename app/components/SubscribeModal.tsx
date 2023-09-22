"use client";

import { Price, ProductWithPrice } from "@/types";
import Modal from "./Modal";
import CustomButton from "./CustomButton";

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
            <CustomButton key={price.id}>
              {`Subscribe for ${formatPrice(price)} a ${
                price.interval
              }`}
            </CustomButton>
          ));
        })}
      </div>
    );
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
