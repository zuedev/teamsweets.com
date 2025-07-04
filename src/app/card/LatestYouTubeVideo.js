"use client";
import { useEffect, useState } from "react";

export default () => {
  const [latestYouTubeVideoId, setLatestYouTubeVideoId] = useState("");

  useEffect(() => {
    fetch("https://api.zue.dev/96/youtube/latest-video?channelHandle=@vtsweets")
      .then((res) => res.text())
      .then((videoId) => {
        setLatestYouTubeVideoId(videoId);
      });
  }, []);

  return (
    <iframe
      src={`https://www.youtube.com/embed/${latestYouTubeVideoId}`}
    ></iframe>
  );
};
