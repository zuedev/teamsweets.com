import "./globals.css";

export const metadata = {
  title: "Team Sweets",
  description: "VTSweets' official website",
  icons: {
    icon: "/sweet.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-black text-white">
      <body className="antialiased">{children}</body>
    </html>
  );
}
