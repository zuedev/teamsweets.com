import Link from "next/link";

export default () => {
  const socials = [
    {
      href: "/tip",
      icon: "https://cdn.simpleicons.org/paypal/white",
      title: "PayPal",
    },
    {
      href: "/tiktok",
      icon: "https://cdn.simpleicons.org/tiktok/white",
      title: "TikTok",
    },
    {
      href: "/twitter",
      icon: "https://cdn.simpleicons.org/x/white",
      title: "X/Twitter",
    },
    {
      href: "/reddit",
      icon: "https://cdn.simpleicons.org/reddit/white",
      title: "Reddit",
    },
    {
      href: "/instagram",
      icon: "https://cdn.simpleicons.org/instagram/white",
      title: "Instagram",
    },
  ];

  return (
    <div className="flex flex-row justify-between gap-4">
      {socials.map((social) => (
        <Link
          href={social.href}
          key={social.title}
          className="transform hover:scale-125 transition-transform"
        >
          <img
            src={`${social.icon}`}
            className="h-[8vw] w-[8vw] object-contain"
            alt={social.title}
            title={social.title}
          />
        </Link>
      ))}
    </div>
  );
};
