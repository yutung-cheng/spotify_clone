"use client";

import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import AuthModal from "../components/AuthModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  } else {
    return (
      <div>
        <AuthModal />
      </div>
    );
  }
};

export default ModalProvider;
