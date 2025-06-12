import { useState } from "react";

export default () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    {
      label: "About",
      href: "/?skip#about",
    },
  ];

  return (
    <div className="z-10">
      {/* Toggle button for side menu */}
      <button
        className="fixed top-0 left-0 text-4xl bg-black text-white px-2 py-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "" : "☰"}
      </button>

      {/* click detector for closing menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Side menu */}
      <nav
        className={`fixed top-0 left-0 h-full bg-black text-white transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col items-start p-4 space-y-4">
          {links.map((link) => (
            <li key={link.href} className="w-full text-center">
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg hover:text-gray-400"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
