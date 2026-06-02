// website/components/useScramble.ts
"use client";
import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!%&";

/** Resolves `target` from random glyphs to the final string over `duration` ms. */
export function useScramble(target: string, delay = 250, duration = 1400) {
  const [text, setText] = useState(target);

  useEffect(() => {
    // Respect reduced-motion: skip the effect entirely.
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(target);
      return;
    }

    let raf = 0;
    let start: number | null = null;

    const tick = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const resolved = Math.floor(progress * target.length);
      let out = "";
      for (let i = 0; i < target.length; i++) {
        if (target[i] === " ") out += " ";
        else out += i < resolved ? target[i] : CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setText(out);
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setText(target);
    };

    const t = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [target, delay, duration]);

  return text;
}
