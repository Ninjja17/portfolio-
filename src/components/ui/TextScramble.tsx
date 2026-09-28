"use client";

import React, { useEffect, useState, useRef } from "react";

interface TextScrambleProps {
  text: string;
  className?: string;
  trigger?: boolean | string | number;
  hoverTrigger?: boolean;
  speed?: number;
  characters?: string;
}

const DEFAULT_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#@$%&*<>/";

export function TextScramble({
  text,
  className = "",
  trigger = true,
  hoverTrigger = true,
  speed = 28,
  characters = DEFAULT_CHARS,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const isScrambling = useRef(false);

  const scramble = () => {
    if (isScrambling.current) return;
    isScrambling.current = true;

    let iteration = 0;
    const maxIterations = text.length * 2;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration / 2) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        isScrambling.current = false;
      }

      iteration += 1;
    }, speed);
  };

  useEffect(() => {
    scramble();
  }, [text, trigger]);

  return (
    <span
      onMouseEnter={() => {
        if (hoverTrigger) scramble();
      }}
      className={`inline-block font-mono cursor-default select-none ${className}`}
    >
      {displayText}
    </span>
  );
}
