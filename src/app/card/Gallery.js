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

  // Extract all categories and artists from galleryImages, with counts
  const { categoryCounts, artistCounts } = useMemo(() => {
    const categoryCounts = {};
    const artistCounts = {};
    galleryImages.forEach((image) => {
      const { category, artist } = getImageMetadata(image);
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      artistCounts[artist] = (artistCounts[artist] || 0) + 1;
    });
    return { categoryCounts, artistCounts };
  }, [galleryImages]);

  // State for selected category and artist
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedArtist, setSelectedArtist] = useState("All");

  // Filter images by selected category and artist
  const filteredImages = useMemo(() => {
    return galleryImages.filter((image) => {
      const { category, artist } = getImageMetadata(image);
      const categoryMatch =
        selectedCategory === "All" || category === selectedCategory;
      const artistMatch = selectedArtist === "All" || artist === selectedArtist;
      return categoryMatch && artistMatch;
    });
  }, [galleryImages, selectedCategory, selectedArtist]);

  // Calculate filtered counts for selectors
  const filteredCategoryCounts = useMemo(() => {
    // If artist is "All", show total per category; else, show count per category for selected artist
    if (selectedArtist === "All") return categoryCounts;
    const counts = {};
    galleryImages.forEach((image) => {
      const { category, artist } = getImageMetadata(image);
      if (artist === selectedArtist) {
        counts[category] = (counts[category] || 0) + 1;
      }
    });
    return counts;
  }, [galleryImages, categoryCounts, selectedArtist]);

  const filteredArtistCounts = useMemo(() => {
    // If category is "All", show total per artist; else, show count per artist for selected category
    if (selectedCategory === "All") return artistCounts;
    const counts = {};
    galleryImages.forEach((image) => {
      const { category, artist } = getImageMetadata(image);
      if (category === selectedCategory) {
        counts[artist] = (counts[artist] || 0) + 1;
      }
    });
    return counts;
  }, [galleryImages, artistCounts, selectedCategory]);

  // Get sorted lists for selectors, filtering out items with 0 count
  const categories = useMemo(
    () =>
      Object.keys(filteredCategoryCounts)
        .filter((cat) => filteredCategoryCounts[cat] > 0)
        .sort(),
    [filteredCategoryCounts]
  );
  const artists = useMemo(
    () =>
      Object.keys(filteredArtistCounts)
        .filter((artist) => filteredArtistCounts[artist] > 0)
        .sort(),
    [filteredArtistCounts]
  );

  return (
    <>
      <div className="mb-4 flex flex-wrap gap-4">
        <div>
          <label htmlFor="category-select" className="mr-2 font-medium">
            Filter by Category:
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded px-2 py-1 text-black bg-white"
          >
            <option value="All">All ({galleryImages.length})</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat} ({filteredCategoryCounts[cat] || 0})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="artist-select" className="mr-2 font-medium">
            Filter by Artist:
          </label>
          <select
            id="artist-select"
            value={selectedArtist}
            onChange={(e) => setSelectedArtist(e.target.value)}
            className="border rounded px-2 py-1 text-black bg-white"
          >
            <option value="All">All ({galleryImages.length})</option>
            {artists.map((artist) => (
              <option key={artist} value={artist}>
                {artist.replace(/_/g, " ")} ({filteredArtistCounts[artist] || 0}
                )
              </option>
            ))}
          </select>
        </div>
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
                  alt={`${artist} - ${category}: ${filename}`}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-sm font-medium">Artist: {artist}</p>
                  <p className="text-xs">Category: {category}</p>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
};
