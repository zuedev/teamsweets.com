"use client";

import { useState, useEffect } from "react";
import { getFingerprint } from "@thumbmarkjs/thumbmarkjs";

export default () => {
  const [isOpen, setIsOpen] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
          }, 100);
        });
      };

      const typePassword = () => {
        const typingPassword = setInterval(() => {
          setPassword((prev) => {
            if (prev === targetPassword) {
              clearInterval(typingPassword);
              return prev;
            }
            return prev + targetPassword.charAt(prev.length);
          });
        }, 100);
      };

      await typeUsername();
      typePassword();
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
                className="bg-[#1a1a1a] text-white px-4 py-2 hover:bg-[#333]"
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
          <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-[12vw] font-bold">teamsweets.com</h1>
          </div>
        </>
      )}
    </>
  );
};
