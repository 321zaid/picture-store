"use client";

import { useRef, useState } from "react";

const TRACKS = [
  { src: "/kavith-extra.ogg", label: "Kavith Extra" },
  { src: "/kavith-sexy.ogg", label: "Kavith Sexy" },
];

export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [entered, setEntered] = useState(false);

  const startAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().catch(() => {});
  };

  const enter = () => {
    setEntered(true);
    startAudio();
  };

  const nextTrack = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    const audio = e.currentTarget;
    const current = TRACKS.findIndex(
      (t) => t.src === audio.src.split(location.origin)[1]
    );
    const next = TRACKS[(current + 1) % TRACKS.length];
    audio.src = next.src;
    audio.play().catch(() => {});
  };

  // Fallback: any first interaction also starts the audio.
  const onInteract = () => {
    if (!entered) {
      setEntered(true);
      startAudio();
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={TRACKS[0].src}
        preload="auto"
        onEnded={nextTrack}
        className="hidden"
      />

      {!entered && (
        <div
          onClick={onInteract}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-dark-950 px-6 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 via-dark-950 to-dark-950" />
          <div className="relative z-10 flex flex-col items-center">
            <span className="mb-4 inline-block rounded-full border border-primary-500/30 bg-primary-600/20 px-5 py-2.5 text-sm font-medium uppercase tracking-[0.2em] text-primary-400">
              Sexpixel
            </span>
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Welcome to the <span className="text-gradient">Gallery</span>
            </h1>
            <p className="mt-4 max-w-md text-dark-400">
              This experience includes background audio. Tap anywhere to enter.
            </p>
            <button
              onClick={enter}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-primary-500"
            >
              ▶ Enter Site
            </button>
          </div>
        </div>
      )}
    </>
  );
}
