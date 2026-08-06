"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import PasswordModal from "@/components/PasswordModal";

interface PasswordContextType {
  isUnlocked: boolean;
  unlock: (password: string) => boolean;
  openPasswordModal: (onSuccess?: () => void) => void;
  closePasswordModal: () => void;
}

const PASSWORD_KEY = "portfolio_unlocked";
const CORRECT_PASSWORD = "HelloFlor";

const PasswordContext = createContext<PasswordContextType | undefined>(undefined);

export function PasswordProtectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [onSuccessCallback, setOnSuccessCallback] = useState<(() => void) | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(PASSWORD_KEY);
      if (stored === "true") {
        setIsUnlocked(true);
      }
    } catch {
      // localStorage may fail in private mode
    }
  }, []);

  const unlock = (password: string): boolean => {
    if (password === CORRECT_PASSWORD) {
      setIsUnlocked(true);
      try {
        localStorage.setItem(PASSWORD_KEY, "true");
      } catch {
        // ignore
      }
      if (onSuccessCallback) {
        onSuccessCallback();
        setOnSuccessCallback(null);
      }
      return true;
    }
    return false;
  };

  const openPasswordModal = (onSuccess?: () => void) => {
    if (onSuccess) {
      setOnSuccessCallback(() => onSuccess);
    } else {
      setOnSuccessCallback(null);
    }
    setIsModalOpen(true);
  };

  const closePasswordModal = () => {
    setIsModalOpen(false);
    setOnSuccessCallback(null);
  };

  return (
    <PasswordContext.Provider
      value={{
        isUnlocked,
        unlock,
        openPasswordModal,
        closePasswordModal,
      }}
    >
      {children}
      <PasswordModal
        isOpen={isModalOpen}
        onClose={closePasswordModal}
        onUnlock={unlock}
      />
    </PasswordContext.Provider>
  );
}

export function usePasswordProtection() {
  const context = useContext(PasswordContext);
  if (!context) {
    throw new Error(
      "usePasswordProtection must be used within a PasswordProtectionProvider"
    );
  }
  return context;
}
