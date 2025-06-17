export default ({ galleryImages }) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.map((image, index) => (
          <div key={index} className="relative aspect-square">
            <a
              href={image}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full"
            >
              <img
                src={image}
                alt={image}
                className="object-cover w-full h-full"
              />
            </a>
          </div>
        ))}
      </div>
    </>
  );
};
