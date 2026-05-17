"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

import { useEffect, useRef, useState } from "react";

import type { CustomArrowProps, Settings } from "react-slick";

import { motion } from "framer-motion";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center px-6 py-8">
      <div className="aspect-[10/13] w-full max-w-[min(88vw,300px)] animate-pulse rounded-[32px] bg-zinc-800 sm:max-w-[300px] lg:max-w-[320px]" />
    </div>
  ),
});

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
      className={`${className} !left-[-14px] z-30 !flex !h-12 !w-12 !items-center !justify-center !rounded-full !border !border-white/10 !bg-white/[0.06] !text-white !backdrop-blur-xl transition-all duration-300 hover:!border-mango/40 hover:!bg-mango/10 hover:scale-105`}
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
      className={`${className} !right-[-14px] z-30 !flex !h-12 !w-12 !items-center !justify-center !rounded-full !border !border-white/10 !bg-white/[0.06] !text-white !backdrop-blur-xl transition-all duration-300 hover:!border-mango/40 hover:!bg-mango/10 hover:scale-105`}
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
  speed: 600,
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
      el.addEventListener("canplay", tryPlay, {
        once: true,
      });
    }

    return () => {
      el.removeEventListener("canplay", tryPlay);
    };
  }, [isPlaying, activeSrc]);

  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.02,
      }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 18,
      }}
      className="px-2 pb-2"
    >
      <div
        className={`group relative mx-auto aspect-[9/13] w-full max-w-[min(88vw,300px)] overflow-hidden rounded-[32px] border bg-zinc-900/80 shadow-[0_28px_70px_-18px_rgba(0,0,0,0.78)] backdrop-blur-xl transition-all duration-500 sm:max-w-[300px] lg:max-w-[320px] ${
          isPlaying
            ? "scale-[1.02] border-mango/40 ring-1 ring-mango/20"
            : "border-white/10 hover:border-mango/30"
        }`}
      >
        {/* Ambient Glow */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-br from-mango/10 via-transparent to-orange-500/5" />
        </div>

        {/* Media */}
        {isPlaying ? (
          <motion.video
            initial={{
              opacity: 0,
              scale: 1.04,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
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
              setSrcIndex((idx) => (idx + 1 < sources.length ? idx + 1 : idx));
            }}
          />
        ) : (
          <motion.div
            whileHover={{
              scale: 1.06,
            }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
            }}
            className="h-full w-full"
          >
            <Image
              src={thumbnail}
              alt={`${label} — video thumbnail`}
              fill
              className="object-cover"
              sizes="(max-width: 1023px) 90vw, (max-width: 1024px) 45vw, 320px"
            />
          </motion.div>
        )}

        {/* Cinematic Overlay */}
        <div
          className={`pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t transition-all duration-500 ${
            isPlaying
              ? "from-black/40 via-black/5 to-black/20"
              : "from-black/80 via-black/15 to-black/20"
          }`}
        />

        {/* Label */}
        <p className="pointer-events-none absolute bottom-14 left-0 right-0 z-[3] px-4 text-center font-outfit text-[11px] font-medium uppercase tracking-[0.18em] text-white/90 drop-shadow-md sm:text-xs">
          {label}
        </p>

        {/* Play / Pause Controls */}
        {isPlaying ? (
          <motion.button
            whileTap={{ scale: 0.94 }}
            whileHover={{ scale: 1.05 }}
            type="button"
            onClick={onPause}
            className="absolute bottom-4 right-4 z-[4] flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-2xl backdrop-blur-xl transition-all duration-300 hover:bg-white/15"
            aria-label={`Pause: ${label}`}
          >
            <Pause className="h-5 w-5" fill="currentColor" strokeWidth={0} />
          </motion.button>
        ) : (
          <div className="absolute inset-0 z-[4] flex items-center justify-center">
            <motion.button
              whileHover={{
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.95,
              }}
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              type="button"
              onClick={onPlay}
              className="group/play relative flex h-[4.4rem] w-[4.4rem] items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/10 text-white shadow-[0_8px_40px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
              aria-label={`Play: ${label}`}
            >
              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-mango/10 opacity-0 transition-opacity duration-500 group-hover/play:opacity-100" />

              {/* Shine */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover/play:translate-x-full" />

              <Play
                className="relative z-10 ml-1 h-8 w-8"
                fill="currentColor"
                strokeWidth={0}
              />
            </motion.button>
          </div>
        )}

        {/* Border Glow */}
        <div className="absolute inset-0 rounded-[32px] border border-transparent transition-all duration-700 group-hover:border-mango/20" />
      </div>
    </motion.div>
  );
}

export default function ReelsWall() {
  const [playingId, setPlayingId] = useState<number | null>(null);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reels-heading",
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );

      gsap.to(".floating-reels-glow", {
        y: -25,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black px-4 pt-16 pb-16 sm:px-6 sm:pt-20 sm:pb-20 md:px-8 md:pt-24"
    >
      {/* Ambient Glow */}
      <div className="floating-reels-glow absolute left-[-10%] top-[10%] h-[320px] w-[320px] rounded-full bg-mango/10 blur-3xl" />

      <div className="absolute bottom-[-20%] right-[-10%] h-[380px] w-[380px] rounded-full bg-orange-500/10 blur-3xl" />

      {/* Divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Eyebrow */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          viewport={{ once: true }}
          className="mx-auto mb-5 flex w-fit items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-xl"
        >
          <span className="font-outfit text-[11px] uppercase tracking-[0.22em] text-zinc-300">
            Community Stories
          </span>
        </motion.div>

        {/* Heading */}
        <h2 className="reels-heading mx-auto max-w-2xl text-center font-sirelia text-2xl font-normal leading-snug tracking-tight text-white sm:text-3xl lg:text-5xl">
          People sent us videos.
          <br />
          We&apos;re sharing some.
        </h2>

        {/* Slider */}
        <div className="reels-wall-slider reels-arrows-wrap relative mx-auto mt-14 max-w-6xl px-4 pt-2 sm:px-8 lg:px-0">
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
      </div>

      {/* Bottom Fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
