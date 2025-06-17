"use client";

import { useState } from "react";

export default ({ subpages }) => {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <>
      <nav className="p-4 flex flex-row space-x-4 animate-fade-in-delayed-2s justify-center">
        {subpages.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`bg-black p-2 cursor-pointer ${
              currentPage === index
                ? "text-yellow-300"
                : "text-gray-300 hover:text-white"
            } transition-colors duration-300`}
          >
            {subpages[index].name}
          </div>
        ))}
      </nav>
      <div className="bg-black p-4 animate-fade-in-delayed-2s justify-center">
        {subpages[currentPage].content}
      </div>
    </>
  );
};
