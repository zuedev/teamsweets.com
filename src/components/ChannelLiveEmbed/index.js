"use client";

import { useEffect, useState, useRef } from "react";
import { TwitchPlayer } from "react-twitch-embed";

export default (props) => {
  const [userIsLive, setUserIsLive] = useState(false);

  const embed = useRef();

  const handleReady = (e) => {
    embed.current = e;
  };

  useEffect(() => {
    const fetchUserIsLive = async () => {
      const response = await fetch(
        `https://api.zue.dev/96/twitch/streaming?channel=${props.channel}`
      );
      const data = await response.json();

      setUserIsLive(data.status === "live");
    };

    fetchUserIsLive();
  }, []);

  return (
    <>
      {userIsLive ? (
        <>
          <TwitchPlayer
            channel={props.channel}
            onReady={handleReady}
            width={props.width || "100%"}
            height={props.height || "100%"}
            muted={props.muted || false}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};
