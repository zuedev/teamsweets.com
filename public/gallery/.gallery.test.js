const fs = require("fs");
const path = require("path");

const GALLERY_ROOT = path.join(__dirname, "../gallery");

function getGalleryImages(dir) {
  let results = [];
  const list = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((dirent) => !dirent.name.startsWith("."));
  list.forEach((dirent) => {
    const fullPath = path.join(dir, dirent.name);
    if (dirent.isDirectory()) {
      results = results.concat(getGalleryImages(fullPath));
    } else if (dirent.isFile()) {
      // Get relative path from 'public' folder
      const relPath = path
        .relative(path.join(__dirname, ".."), fullPath)
        .replace(/\\/g, "/");
      results.push(relPath);
    }
  });
  return results;
}

describe("Gallery image path format", () => {
  let galleryImages = [];

  beforeAll(() => {
    galleryImages = getGalleryImages(GALLERY_ROOT);
  });

  test("all images should match the required format", () => {
    const regex = /^gallery\/[^\/]+\/[^\/]+\/[^\/]+\.[a-zA-Z0-9]+$/;
    galleryImages.forEach((imagePath) => {
      expect(imagePath).toMatch(regex);
    });
  });
});
