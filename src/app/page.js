"use client";

import { useState, useEffect, useRef } from "react";
import { getFingerprint } from "@thumbmarkjs/thumbmarkjs";

const Music = () => {
  const ref = useRef();
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = 0;

      let maxVolume = 0.5;

      for (let i = 0; i < 100; i++) {
        setTimeout(() => {
          ref.current.volume = (i / 100) * maxVolume;
        }, i * 100);
      }
    }
  }, []);

  const sources = ["/song_cyberfixer.wav", "/song_weow.wav"];

  return (
    <>
      <audio ref={ref} autoPlay loop muted={isMuted}>
        {sources.map((src, i) => (
          <source key={i} type="audio/wav" src={src} />
        ))}
      </audio>

      <button
        onClick={() => setIsMuted(!isMuted)}
        className="fixed top-0 right-0 text-4xl p-2 hover:scale-125 transition-transform"
      >
        {!isMuted ? "🔈" : "🔇"}
      </button>
    </>
  );
};

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
            <source type="video/mp4" src="/laying_legacy.mp4" />
          </video>

          <Music />

          <a
            className="bg-black text-white fixed left-[-40px] top-1/2 transform rotate-90 px-4 py-2 font-mono"
            href="mailto:hello@teamsweets.com"
          >
            Email me!
          </a>

          <div>
            <div className="min-h-screen flex flex-col items-center justify-center gap-8">
              <h1 className="text-[12vw] font-bold leading-none sweets-text-gradient pt-[15px]">
                Sweets
              </h1>
              <a
                className="text-2xl px-6 py-2 bg-[#000] hover:bg-yellow-400 hover:text-black text-white transition-colors duration-500"
                onClick={() => (window.location.href = "/card")}
              >
                Enter the Sweet Escape
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
};
