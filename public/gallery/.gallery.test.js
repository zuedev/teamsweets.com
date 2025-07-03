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

[
  {
    description: "Gallery image path format",
    tests: [
      {
        name: "all images should match the required format",
        fn: () => {
          const galleryImages = getGalleryImages(GALLERY_ROOT);
          const regex = /^gallery\/[^\/]+\/[^\/]+\/[^\/]+\.[a-zA-Z0-9]+$/;
          const failures = [];
          galleryImages.forEach((imagePath) => {
            if (!regex.test(imagePath)) {
              failures.push(imagePath);
            }
          });
          if (failures.length > 0) {
            throw new Error(
              `The following image paths do not match the required format:\n` +
                failures.join("\n")
            );
          }
        },
      },
    ],
  },
].forEach(({ description, tests }) => {
  describe(description, () => {
    tests.forEach(({ name, fn }) => {
      test(name, fn);
    });
  });
});
