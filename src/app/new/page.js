"use client";

import { useState, useEffect } from "react";
import { getFingerprint } from "@thumbmarkjs/thumbmarkjs";
import Socials from "@/components/Socials";

export default () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const targetUsername = "user" + (await getFingerprint()).slice(0, 4);
      const targetPassword = "password";

      const typeUsername = () => {
        return new Promise((resolve) => {
          const typingUsername = setInterval(() => {
            setUsername((prev) => {
              if (prev === targetUsername) {
                clearInterval(typingUsername);
                resolve();
                return prev;
              }
              return prev + targetUsername.charAt(prev.length);
            });
          }, 50);
        });
      };

      const typePassword = () => {
        return new Promise((resolve) => {
          const typingPassword = setInterval(() => {
            setPassword((prev) => {
              if (prev === targetPassword) {
                clearInterval(typingPassword);
                resolve();
                return prev;
              }
              return prev + targetPassword.charAt(prev.length);
            });
          }, 50);
        });
      };

      await typeUsername();
      await typePassword();
      setIsTypingComplete(true);
    };

    fetchData();

    return () => {
      clearInterval(typeUsername);
      clearInterval(typePassword);
    };
  }, []);

  const handleOpen = () => {
    setIsOpen(true);

    const audio = new Audio("/keyboardClick.mp3");
    audio.play();
  };

  return (
    <>
      {!isOpen ? (
        <>
          <div className="min-h-screen flex items-center justify-center">
            <form className="flex flex-col gap-4">
              <img src="/sweet.png" className="w-20 h-20 mx-auto" />
              <input
                type="text"
                placeholder="Username"
                className="bg-[#1a1a1a] text-white px-4 py-2"
                value={username}
                disabled
              />
              <input
                type="password"
                placeholder="Password"
                className="bg-[#1a1a1a] text-white px-4 py-2"
                value={password}
                disabled
              />
              <button
                onClick={handleOpen}
                className={`px-4 py-2 text-white ${
                  isTypingComplete
                    ? "bg-[#444] hover:bg-[#555] cursor-pointer"
                    : "bg-[#111] cursor-not-allowed opacity-50"
                }`}
                disabled={!isTypingComplete}
              >
                Login
              </button>
            </form>
          </div>
        </>
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
          <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-[12vw] font-bold">teamsweets.com</h1>
            <Socials />
          </div>
        </>
      )}
    </>
  );
};
