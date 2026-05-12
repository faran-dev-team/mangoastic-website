"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { CustomArrowProps, Settings } from "react-slick";

const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center px-6 py-8">
      <div className="aspect-[10/13] w-full max-w-[min(88vw,300px)] animate-pulse rounded-2xl bg-zinc-800 sm:max-w-[300px] lg:max-w-[320px]" />
    </div>
  ),
});

/**
 * Put exported MP4s in `public/reels/` (`reel-1.mp4` …) for reliable same-origin playback.
 * Fallback: your Pexels **download** page URLs (may redirect / not play in every browser as `<video src>`).
 * `thumbnail`: before play + `poster` on `<video>`.
 */
const DEMO_REELS = [
  {
    id: 1,
    label: "Customer unboxing",
    thumbnail: "/images/mango1.jpg",
    sources: [
      "/reels/reel-1.mp4",
      "https://www.pexels.com/download/video/1583289/",
    ],
  },
  {
    id: 2,
    label: "From the orchard",
    thumbnail: "/images/mango2.jpg",
    sources: [
      "/reels/reel-2.mp4",
      "https://www.pexels.com/download/video/7788779/",
    ],
  },
  {
    id: 3,
    label: "First bite",
    thumbnail: "/images/mango3.jpg",
    sources: [
      "/reels/reel-3.mp4",
      "https://www.pexels.com/download/video/31775966/",
    ],
  },
  {
    id: 4,
    label: "ASMR slice",
    thumbnail: "/images/mango4.jpg",
    sources: [
      "/reels/reel-4.mp4",
      "https://www.pexels.com/download/video/11760122/",
    ],
  },
  {
    id: 5,
    label: "Founder note",
    thumbnail: "/images/mango5.jpg",
    sources: [
      "/reels/reel-5.mp4",
      "https://www.pexels.com/download/video/32636776/",
    ],
  },
  {
    id: 6,
    label: "Season pass",
    thumbnail: "/images/hero.png",
    sources: [
      "/reels/reel-6.mp4",
      "https://www.pexels.com/download/video/8677691/",
    ],
  },
] as const;

function PrevArrow({ onClick, className, style }: CustomArrowProps) {
  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={onClick}
      aria-label="Previous reels"
    >
      <ChevronLeft className="h-5 w-5" strokeWidth={2.25} />
    </button>
  );
}

function NextArrow({ onClick, className, style }: CustomArrowProps) {
  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={onClick}
      aria-label="Next reels"
    >
      <ChevronRight className="h-5 w-5" strokeWidth={2.25} />
    </button>
  );
}

const sliderSettings: Settings = {
  infinite: true,
  speed: 450,
  slidesToShow: 4,
  slidesToScroll: 1,
  swipeToSlide: true,
  touchThreshold: 8,
  dots: false,
  arrows: true,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  responsive: [
    {
      breakpoint: 1023,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
  ],
};

function ReelSlideCard({
  label,
  thumbnail,
  sources,
  isPlaying,
  onPlay,
  onPause,
}: {
  label: string;
  thumbnail: string;
  sources: readonly string[];
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [srcIndex, setSrcIndex] = useState(0);

  useEffect(() => {
    if (isPlaying) setSrcIndex(0);
  }, [isPlaying]);

  const activeSrc = sources[Math.min(srcIndex, sources.length - 1)];

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !isPlaying) return;

    const tryPlay = () => {
      el.muted = false;
      void el.play().catch(() => {
        el.muted = true;
        void el.play().catch(() => {});
      });
    };

    if (el.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      tryPlay();
    } else {
      el.addEventListener("canplay", tryPlay, { once: true });
    }

    return () => {
      el.removeEventListener("canplay", tryPlay);
    };
  }, [isPlaying, activeSrc]);

  return (
    <div className="px-2 pb-1">
      <div
        className={`group relative mx-auto aspect-[9/13] w-full max-w-[min(88vw,300px)] overflow-hidden rounded-2xl border border-zinc-700/90 bg-zinc-900 shadow-[0_24px_55px_-16px_rgba(0,0,0,0.72)] ring-1 ring-white/5 transition duration-300 sm:max-w-[300px] lg:max-w-[320px] ${
          isPlaying
            ? "border-amber-500/40 ring-amber-500/15"
            : "hover:border-amber-500/35 hover:ring-amber-500/10"
        }`}
      >
        {isPlaying ? (
          <video
            key={`${activeSrc}-${srcIndex}`}
            ref={videoRef}
            className="absolute inset-0 z-[1] h-full w-full object-cover"
            playsInline
            controls={false}
            loop
            preload="metadata"
            poster={thumbnail}
            src={activeSrc}
            onError={() => {
              setSrcIndex((idx) =>
                idx + 1 < sources.length ? idx + 1 : idx,
              );
            }}
          />
        ) : (
          <Image
            src={thumbnail}
            alt={`${label} — video thumbnail`}
            fill
            className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 1023px) 90vw, (max-width: 1024px) 45vw, 320px"
          />
        )}

        <div
          className={`pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t ${
            isPlaying
              ? "from-black/45 via-transparent to-black/25"
              : "from-black/75 via-black/15 to-black/25"
          }`}
        />

        <p className="pointer-events-none absolute bottom-12 left-0 right-0 z-[2] px-3 text-center font-outfit text-[11px] font-medium uppercase tracking-wider text-white/90 drop-shadow-md sm:bottom-14 sm:text-xs">
          {label}
        </p>

        {isPlaying ? (
          <button
            type="button"
            onClick={onPause}
            className="absolute bottom-3 right-3 z-[3] flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white shadow-lg backdrop-blur-xl transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
            aria-label={`Pause: ${label}`}
          >
            <Pause className="h-5 w-5" fill="currentColor" strokeWidth={0} />
          </button>
        ) : (
          <div className="absolute inset-0 z-[3] flex items-center justify-center p-3">
            <button
              type="button"
              onClick={onPlay}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:bg-white/15 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:scale-95 sm:h-[4rem] sm:w-[4rem]"
              aria-label={`Play: ${label}`}
            >
              <Play
                className="ml-1 h-7 w-7 text-white sm:h-8 sm:w-8"
                fill="currentColor"
                strokeWidth={0}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ReelsWall() {
  const [playingId, setPlayingId] = useState<number | null>(null);

  return (
    <section className="bg-black px-4 pt-14 pb-12 sm:px-6 sm:pt-16 sm:pb-14 md:px-8 md:pt-20 md:pb-16 lg:pt-4">
      <div className="mx-auto max-w-6xl mt-3">
        <h2 className="mx-auto max-w-xl text-center font-sirelia text-xl font-normal leading-snug tracking-tight text-white sm:text-2xl lg:text-3xl">
          People sent us videos. We&apos;re sharing some.
        </h2>
      </div>

      <div className="reels-wall-slider reels-arrows-wrap relative mx-auto mt-10 max-w-6xl px-4 pt-2 sm:px-8 lg:px-0">
        <Slider {...sliderSettings} beforeChange={() => setPlayingId(null)}>
          {DEMO_REELS.map((reel) => (
            <div key={reel.id}>
              <ReelSlideCard
                label={reel.label}
                thumbnail={reel.thumbnail}
                sources={reel.sources}
                isPlaying={playingId === reel.id}
                onPlay={() => setPlayingId(reel.id)}
                onPause={() => setPlayingId(null)}
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
