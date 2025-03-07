"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Takes a `text` prop and displays it one character at a time with a typing effect.
 *
 * @param {Object} props - Component props
 * @param {string} props.text - The text to display with typing effect
 * @param {string} [props.sound] - The URL of the sound to play with each character
 * @returns {JSX.Element} The rendered component
 */
export default function TypingText({ text, sound }) {
  const [{ currentText, index }, setState] = useState({
    currentText: "",
    index: 0,
  });
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (sound) {
      audioRef.current = new Audio(sound);
    }
  }, [sound]);

  useEffect(() => {
    if (index < text.length) {
      intervalRef.current = setInterval(() => {
        setState((prevState) => {
          const newIndex = prevState.index + 1;
          if (audioRef.current && newIndex <= text.length) {
            audioRef.current.currentTime = 0; // Reset the audio to the start
            audioRef.current.play();
          }
          return {
            currentText: text.slice(0, newIndex),
            index: newIndex,
          };
        });
      }, 100);

      return () => clearInterval(intervalRef.current);
    }
  }, [index, text]);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, [text]);

  return <span>{currentText}</span>;
}
