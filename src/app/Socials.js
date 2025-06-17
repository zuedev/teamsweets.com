import Link from "next/link";

export default () => {
  const socials = [
    {
      href: "/twitter",
      icon: "https://cdn.simpleicons.org/x/white",
      title: "X/Twitter",
    },
    {
      href: "/bluesky",
      icon: "https://cdn.simpleicons.org/bluesky/white",
      title: "BlueSky",
    },
    {
      href: "/twitch",
      icon: "https://cdn.simpleicons.org/twitch/white",
      title: "Twitch",
    },
    {
      href: "/tiktok",
      icon: "https://cdn.simpleicons.org/tiktok/white",
      title: "TikTok",
    },
    {
      href: "/instagram",
      icon: "https://cdn.simpleicons.org/instagram/white",
      title: "Instagram",
    },
    {
      href: "/youtube",
      icon: "https://cdn.simpleicons.org/youtube/white",
      title: "YouTube",
    },
    {
      href: "/throne",
      icon: "/throne.png",
      title: "Throne",
      classes: "grayscale brightness-[100]",
    },
  ];

  return (
    <div className="flex flex-row justify-between gap-4">
      {socials.map((social) => (
        <Link
          href={social.href}
          key={social.title}
          className="transform hover:scale-110 transition-transform"
        >
          <img
            src={`${social.icon}`}
            className={`h-[8vw] w-[8vw] object-contain ${social.classes}`}
            alt={social.title}
            title={social.title}
          />
        </Link>
      ))}
    </div>
  );
};
