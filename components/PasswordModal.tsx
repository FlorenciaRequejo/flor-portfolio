"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlock: (password: string) => boolean;
}

export default function PasswordModal({
  isOpen,
  onClose,
  onUnlock,
}: PasswordModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onUnlock(password);
    if (success) {
      setError(false);
      setPassword("");
      onClose();
    } else {
      setError(true);
    }
  };

  const handleClose = () => {
    setError(false);
    setPassword("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
            className="relative w-full max-w-md bg-white rounded-[28px] md:rounded-[36px] p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.3)] border border-black/10 z-10 text-left overflow-hidden"
          >
            {/* Header lock icon */}
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-full bg-[#1B237A]/10 flex items-center justify-center text-[#1B237A]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </div>

              <button
                onClick={handleClose}
                className="w-9 h-9 rounded-full bg-surface border border-border flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Title & Description */}
            <h3 className="font-serif text-[26px] sm:text-[30px] leading-tight text-[#1B237A] font-normal tracking-tight">
              Insert Password
            </h3>
            <p className="font-sans text-[14px] leading-relaxed text-[#D946EF] font-medium mt-2">
              This case study is password protected. Enter the password to unlock all protected content.
            </p>
            <a
              href="mailto:florencia.requejo@gmail.com"
              className="inline-block font-sans text-[13px] text-[#D946EF] underline hover:opacity-80 transition-opacity mt-2"
            >
              Don't have the password? Request access via email
            </a>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(false);
                  }}
                  placeholder="Insert password..."
                  autoFocus
                  className={`w-full h-[52px] pl-5 pr-12 rounded-2xl bg-slate-50 border ${
                    error ? "border-red-500 focus:ring-red-500" : "border-slate-200 focus:border-[#1B237A]"
                  } font-sans text-[15px] text-[#1B237A] font-medium outline-none transition-all duration-200 placeholder:text-[#1B237A]/40`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1B237A]/50 hover:text-[#1B237A] transition-colors"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.8"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.8"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12c1.274 4.057 5.064 7 9.54 7 4.478 0 8.268-2.943 9.542-7-1.274-4.057-5.064-7-9.542-7-4.476 0-8.266 2.943-9.54 7z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-sans text-[13px] text-red-500 font-medium"
                >
                  Incorrect password. Please try again.
                </motion.p>
              )}

              <button
                type="submit"
                className="w-full h-[52px] rounded-2xl bg-primary text-background font-sans font-semibold text-[13px] uppercase tracking-wider hover:opacity-90 transition-opacity duration-200 mt-2 flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Unlock Case Studies</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
