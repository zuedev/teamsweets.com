import "./globals.css";
import Head from "next/head";
import { Suspense } from "react";

export const metadata = {
  title: "Team Sweets",
  description: "VTSweets' official website",
  icons: {
    icon: "/images/sweet.png",
  },
};

export default ({ children }) => {
  return (
    <Suspense>
      <html lang="en" className="bg-black text-white">
        <Head>
          <link rel="preload" href="/videos/laying_legacy.mp4" as="video" />
        </Head>
        <body className="min-h-screen">{children}</body>
      </html>
    </Suspense>
  );
};
