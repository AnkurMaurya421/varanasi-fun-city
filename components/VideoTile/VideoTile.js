"use client";
import { useState } from "react";

export default function VideoTile({ poster, src, fallbackHref, photoClass, playClass }) {
  const [playing, setPlaying] = useState(false);

  if (!src) {
    return (
      <a href={fallbackHref} target="_blank" rel="noopener noreferrer" aria-label="Video from Varanasi Fun City, watch on Google">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={poster} alt="Video preview from Varanasi Fun City" loading="lazy" className={photoClass} />
        <span className={playClass} aria-hidden="true">▶</span>
      </a>
    );
  }

  if (playing) {
    return (
      <video className={photoClass} src={src} poster={poster} controls autoPlay playsInline preload="metadata" />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label="Play video from Varanasi Fun City"
      style={{ display: "block", position: "relative", width: "100%", padding: 0, border: 0, background: "none", cursor: "pointer" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt="Video preview from Varanasi Fun City" loading="lazy" className={photoClass} />
      <span className={playClass} aria-hidden="true">▶</span>
    </button>
  );
}
