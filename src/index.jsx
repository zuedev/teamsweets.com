import { useState, useEffect } from "react";

export const App = () => {
  const [countdown, setCountdown] = useState(9);

  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown <= 1)
        window.location.href = "https://www.twitch.tv/vtsweets";
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  return (
    <>
      <main className="h-screen flex items-center justify-center bg-linear-20 from-[var(--from)] via-[var(--via)] to-[var(--to)]">
        <article className="transform-3d rotate-x-25 rotate-z-20 shadow-xl bg-black text-white p-4 rounded-lg cursor-pointer select-none text-xl font-bold max-w-md text-justify">
          Welcome to <sweet>The Sweet Escape</sweet>! 🍬🎮
          <br />
          <br />
          This page is still under construction.
          <br />
          <br />
          Redirecting to my stream in {countdown}...
        </article>
      </main>
    </>
  );
};
