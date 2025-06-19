export default () => {
  return (
    <>
      <video
        playsInline
        autoPlay
        muted
        loop
        style={{
          objectFit: "cover",
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: "0",
          left: "0",
          zIndex: "-1",
        }}
      >
        <source type="video/mp4" src="/laying_legacy.mp4" />
      </video>

      <div>
        <div className="min-h-screen flex flex-col items-center justify-center gap-8">
          <h1 className="text-[12vw] font-bold leading-none sweets-text-gradient pt-[15px]">
            Sweets
          </h1>
          <a
            className="text-2xl px-6 py-2 bg-[#000] hover:bg-yellow-400 hover:text-black text-white transition-colors duration-500"
            href="/card"
          >
            Enter the Sweet Escape
          </a>
          {/* <Socials /> */}
        </div>
      </div>
    </>
  );
};
