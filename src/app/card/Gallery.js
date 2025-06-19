"use client";

import React, { useState, useMemo } from "react";

export default ({ galleryImages }) => {
  // Function to extract image metadata from path
  const getImageMetadata = (imagePath) => {
    // Expected format: /gallery/category/artist_name/filename.ext
    // Remove leading slash if present
    if (imagePath.startsWith("/")) {
      imagePath = imagePath.slice(1);
    }
    const pathParts = imagePath.split("/");

    // Check if path follows expected structure
    if (pathParts.length >= 4 && pathParts[0] === "gallery") {
      return {
        category: pathParts[1],
        artist: pathParts[2],
        filename: pathParts[3],
        fullPath: imagePath,
      };
    }

    // Fallback for images not following the structure
    return {
      category: "Uncategorized",
      artist: "Unknown",
      filename: imagePath.split("/").pop(),
      fullPath: imagePath,
    };
  };

  // Extract all categories from galleryImages
  const categories = useMemo(() => {
    const cats = new Set();
    galleryImages.forEach((image) => {
      const { category } = getImageMetadata(image);
      cats.add(category);
    });
    return Array.from(cats);
  }, [galleryImages]);

  // State for selected category
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter images by selected category
  const filteredImages = useMemo(() => {
    if (selectedCategory === "All") return galleryImages;
    return galleryImages.filter(
      (image) => getImageMetadata(image).category === selectedCategory
    );
  }, [galleryImages, selectedCategory]);

  return (
    <>
      <div className="mb-4">
        <label htmlFor="category-select" className="mr-2 font-medium">
          Filter by Category:
        </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="All">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image, index) => {
          const { category, artist, filename, fullPath } =
            getImageMetadata(image);

          return (
            <div
              key={index}
              className="relative aspect-square group overflow-hidden"
            >
              <a
                href={fullPath}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
              >
                <img
                  src={fullPath}
                  alt={`${category} by ${artist}: ${filename}`}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-sm font-medium capitalize">{category}</p>
                  <p className="text-xs">Artist: {artist.replace(/_/g, " ")}</p>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
};
