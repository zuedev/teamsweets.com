import Subpages from "./Subpages.js";
import fs from "fs";
import Gallery from "./Gallery.js";
import Socials from "./Socials.js";

export default () => {
  let latestYouTubeVideoId = "-z5jxRbk3R4";
  const latestTwitchVodId = "2487659351";

  function getGalleryImages(dir, base = "/gallery") {
    let results = [];
    fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
      const fullPath = `${dir}/${entry.name}`;
      const relPath = `${base}/${entry.name}`;
      if (entry.isDirectory()) {
        results = results.concat(getGalleryImages(fullPath, relPath));
      } else if (/\.(jpg|jpeg|png|gif)$/i.test(entry.name)) {
        results.push(relPath);
      }
    });
    return results;
  }

  const galleryImages = getGalleryImages("public/gallery").sort(
    () => Math.random() - 0.5
  );

  const subpages = [
    {
      name: "Home",
      content: (
        <div className="flex flex-col md:flex-row gap-4">
          <img src="/pfp.png" className="w-48 object-cover" alt="Profile" />
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-3xl font-bold">Welcome to the Sweet Escape!</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-mono text-lg font-semibold">
                  Latest YouTube Video
                </h3>
                <iframe
                  src={`https://www.youtube.com/embed/${latestYouTubeVideoId}`}
                ></iframe>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-lg font-semibold">
                  Latest Twitch VOD
                </h3>
                <iframe
                  src={`https://player.twitch.tv/?video=${latestTwitchVodId}&parent=localhost&parent=beta.teamsweets-com.pages.dev&parent=teamsweets.com&autoplay=false`}
                ></iframe>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-mono text-lg font-semibold">Socials</h3>
              <Socials />
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "About",
      content: (
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">About Me</h2>
          <div className="space-y-4">
            <p>
              Hey there! I'm Sweets, a proud Guyanese and African American
              VTuber, variety streamer, full-time college student, and model.
              Since 2021, I've been streaming on Twitch, building a fun, safe,
              and welcoming space where everyone can be themselves and connect
              over shared interests.
            </p>
            <p>
              Gaming is my passion, and I love diving into all kinds of
              genres—from intense FPS battles to immersive RPG adventures, with
              a recent sweet spot for JRPGs! Whether I'm playing on my
              PlayStation or PC, I'm all about sharing those exciting gaming
              moments with my awesome community.
            </p>
            <p>
              But that's not all—I also host productivity and co-working study
              streams, perfect for fellow students or anyone looking to boost
              focus and get things done. Balancing college life (I'm working on
              a dual-degree in PR and Journalism!) with streaming and modeling
              keeps me busy, but it's all about creating a unique space where
              entertainment meets productivity.
            </p>
            <p>
              Outside the digital world, I'm a model who loves bringing
              creativity and style to everything I do. I'm also passionate about
              giving back, regularly organizing charity streams to support
              causes close to my heart.
            </p>
            <p>
              And yes, I'm totally obsessed with candy and sweets—hence the
              name! (I have a serious sweet tooth… whoops!) When I'm not gaming
              or studying, I enjoy meeting new people, and I can't wait to
              connect with you and grow this community into something truly
              special.
            </p>
            <p>
              Whether you're here for the gameplay, the study vibes, or just to
              hang out, you've found your spot. Welcome to the world of Sweets!
              🍬🎮✨
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-black">
            {[
              {
                title: "Affiliations",
                content: (
                  <ul className="list-disc pl-5">
                    <li>Ubisoft, Yellow Brick Games and Epic partner</li>
                    <li>Waifu Wares & Crunchyroll affiliate</li>
                    <li>Official creator for Infinity Nikki & Once Human</li>
                    <li>
                      Member of Disabled Content Creators Collective, Twitch's
                      black Unity Guild, Twitch's Women's Guild, Vtuber Creator
                      Club, & Twitch's Highlight Disabled Talent Collection
                    </li>
                  </ul>
                ),
              },
              {
                title: "Available for...",
                content: (
                  <ul className="list-disc pl-5">
                    <li>Sponsorships</li>
                    <li>Partnerships</li>
                    <li>Giveaways</li>
                    <li>Game keys</li>
                    <li>Hosting</li>
                    <li>Co-streaming</li>
                    <li>Collaborations</li>
                  </ul>
                ),
              },
              {
                title: "Tags",
                content: (
                  <ul className="list-disc pl-5">
                    <li>Art Tag: #vtSweetsArt</li>
                    <li>Clips: #SweetsCaughtIn4k</li>
                  </ul>
                ),
              },
              {
                title: "Charities I Support",
                content: (
                  <ul className="list-disc pl-5">
                    <li>American Foundation Suicide Prevention</li>
                    <li>Operation Gratitude</li>
                    <li>Autoimmune Association</li>
                    <li>Gamers Outreach</li>
                  </ul>
                ),
              },
            ].map((item, index) => (
              <div key={index} className="bg-gray-100 p-4 shadow">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <div>{item.content}</div>
              </div>
            ))}
          </div>
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
            <a
              className="bg-black text-white fixed left-[-40px] top-1/2 transform rotate-90 px-4 py-2 font-mono animate-fade-in-delayed-2s"
              href="mailto:hello@teamsweets.com"
            >
              Email me!
            </a>
            <Subpages subpages={subpages} />
          </div>
        </div>
      </div>
    </>
  );
};
