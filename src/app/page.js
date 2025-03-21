"use client";

import { useState, useEffect, useRef } from "react";
import { getFingerprint } from "@thumbmarkjs/thumbmarkjs";
import Socials from "@/components/Socials";
import ChannelLiveEmbed from "@/components/ChannelLiveEmbed";
import { useSearchParams } from "next/navigation";

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

  const sources = ["/sounds/song_cyberfixer.wav", "/sounds/song_weow.wav"];

  return (
    <>
      <audio ref={ref} autoPlay loop muted={isMuted}>
        {sources.map((src, i) => (
          <source key={i} type="audio/wav" src={src} />
        ))}
      </audio>

      <button
        onClick={() => setIsMuted(!isMuted)}
        className="fixed top-0 left-0 text-4xl p-2 hover:scale-125 transition-transform"
      >
        {!isMuted ? "🔈" : "🔇"}
      </button>
    </>
  );
};

export default () => {
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(searchParams.has("skip") ? true : false);

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
              <img src="/images/sweet.png" className="w-20 h-20 mx-auto" />
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
            <source type="video/mp4" src="/videos/laying_legacy.mp4" />
          </video>

          <Music />

          <div>
            <div className="min-h-screen flex flex-col items-center justify-center gap-8">
              <h1 className="text-[12vw] font-bold leading-none">
                teamsweets.com
              </h1>
              <Socials />
              <ChannelLiveEmbed
                channel={searchParams.get("channel") || "vtsweets"}
                width={640}
                height={360}
                muted
              />
            </div>
            <div className="absolute bottom-0 w-full">
              <p className="text-2xl bg-[#fe00b1] text-black dark:bg-[#741bff] dark:text-white mx-auto w-fit p-2">
                ↓ Scroll for more ↓
              </p>
            </div>
          </div>

          <div className="bg-[#fe00b1] text-black dark:bg-[#741bff] dark:text-white min-h-screen flex flex-col items-center justify-center p-16 gap-16">
            <h1 className="text-4xl font-bold">Get to Know Sweets</h1>

            <p className="text-2xl">
              My name is Sweets. I am variety streamer, and full-time college
              student and model. In 2021, I started streaming on Twitch and have
              been able to continually successfully grow my platform on all
              fronts. As a full-time college student with a passion for gaming
              and helping others, I've created a unique space where
              entertainment meets productivity.
            </p>
            <p className="text-2xl">
              I'm all about variety when it comes to gaming. From RPGs to FPS
              and everything in between, I love exploring different genres and
              sharing the experience with my awesome community. But that's not
              all – I also host productivity and co-working study streams,
              perfect for fellow students or anyone looking to boost their focus
              and get things done.
            </p>
            <p className="text-2xl">
              When I'm not hitting the books or streaming, I work as a model,
              bringing creativity and style to everything I do. I believe in
              using my platform for good, which is why I regularly organize
              charity streams to support causes close to my heart.
            </p>
            <p className="text-2xl">
              Whether you're here for the gameplay, the study sessions, or just
              to hang out, there's a place for you in our vibrant community.
            </p>
          </div>
        </>
      )}
    </>
  );
};
