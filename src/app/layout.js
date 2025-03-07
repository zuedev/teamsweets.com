import "./globals.css";

export const metadata = {
  title: "Team Sweets",
  description: "VTSweets' official website",
  icons: {
    icon: "/favicon.png",
  },
};

export default ({ children }) => {
  return (
    <html lang="en" className="bg-black text-white">
      <body className="min-h-screen">{children}</body>
    </html>
  );
};
