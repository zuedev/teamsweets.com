"use client";

import { useState } from "react";
import TypingText from "@/components/TypingText";

export default () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      {!isOpen ? (
        <div className="min-h-screen flex items-center justify-center">
          <button
            onClick={handleOpen}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Open Page
          </button>
        </div>
      ) : (
        <>
          <video
            playsInline
            autoPlay
            muted
            loop
            style={{
              objectFit: "cover",
              width: "100vw",
              height: "100vh",
              position: "fixed",
              top: "0",
              left: "0",
              zIndex: "-1",
            }}
          >
            <source type="video/mp4" src="/background.mp4" />
          </video>
          <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-[12vw] font-bold">
              <TypingText text="teamsweets.com" sound="/keyboardClick.mp3" />
            </h1>
          </div>
        </>
      )}
    </>
  );
};
