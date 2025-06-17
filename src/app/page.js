import Subpages from "./Subpages.js";
import fs from "fs";
import Gallery from "./Gallery.js";
import Socials from "./Socials.js";

export default () => {
  const galleryImages = fs
    .readdirSync("public/gallery")
    .map((filename) => `/gallery/${filename}`)
    .sort(() => Math.random() - 0.5);

  const subpages = [
    {
      name: "Home",
      content: (
        <div className="flex flex-col md:flex-row gap-4">
          <img src="/pfp.png" className="w-48 h-48" />
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-3xl font-bold">Welcome to the Sweet Escape!</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <Socials />
          </div>
        </div>
      ),
    },
    {
      name: "About",
      content: (
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">About Me</h2>
          <p>
            Hey there! I'm Sweets, a proud Guyanese and African American VTuber,
            variety streamer, full-time college student, and model. Since 2021,
            I've been streaming on Twitch, building a fun, safe, and welcoming
            space where everyone can be themselves and connect over shared
            interests.
          </p>
          <p>
            Gaming is my passion, and I love diving into all kinds of
            genres—from intense FPS battles to immersive RPG adventures, with a
            recent sweet spot for JRPGs! Whether I'm playing on my PlayStation
            or PC, I'm all about sharing those exciting gaming moments with my
            awesome community.
          </p>
          <p>
            But that's not all—I also host productivity and co-working study
            streams, perfect for fellow students or anyone looking to boost
            focus and get things done. Balancing college life (I'm working on a
            dual-degree in PR and Journalism!) with streaming and modeling keeps
            me busy, but it's all about creating a unique space where
            entertainment meets productivity.
          </p>
          <p>
            Outside the digital world, I'm a model who loves bringing creativity
            and style to everything I do. I'm also passionate about giving back,
            regularly organizing charity streams to support causes close to my
            heart.
          </p>
          <p>
            And yes, I'm totally obsessed with candy and sweets—hence the name!
            (I have a serious sweet tooth… whoops!) When I'm not gaming or
            studying, I enjoy meeting new people, and I can't wait to connect
            with you and grow this community into something truly special.
          </p>
          <p>
            Whether you're here for the gameplay, the study vibes, or just to
            hang out, you've found your spot. Welcome to the world of Sweets!
            🍬🎮✨
          </p>
        </div>
      ),
    },
    {
      name: "Gallery",
      content: <Gallery galleryImages={galleryImages} />,
    },
  ];

  return (
    <>
      <div className="bg-[url('/the-sweet-escape.png')] bg-cover bg-center min-h-screen animate-fade-in fixed inset-0 -z-10" />
      <div>
        <div className="flex flex-col min-h-screen animate-backdrop-blur-delayed-1s relative">
          <div className="max-w-4xl mx-auto mt-[10vh] p-4">
            <h1 className="text-[100px] pt-[1.5rem] leading-[0.7] font-bold animate-fade-in-delayed-2s text-center sweets-text-gradient">
              Sweets
            </h1>
            <Subpages subpages={subpages} />
          </div>
        </div>
      </div>
    </>
  );
};
