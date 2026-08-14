"use client";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { YOUTUBE } from "@/registry/youtube";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { memo, useMemo, useCallback, useEffect, useState } from "react";

const EMBLA_OPTIONS = {
  loop: true,
  align: "center",
  skipSnaps: false,
} as const;

const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function formatDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : dateFmt.format(d);
}

// ─── Video card (unchanged) ───────────────────────────────────────────────────
const VideoCard = memo(function VideoCard({
  video,
  active,
}: {
  video: (typeof YOUTUBE)[0];
  active: boolean;
}) {
  const embedUrl = `https://www.youtube.com/embed/${video.id}?modestbranding=1&rel=0&controls=1&showinfo=0&color=white`;

  return (
    <div
      className={cn(
        "h-full transform-gpu transition-all duration-1000 ease-out",
        active ? "scale-110 opacity-100" : "scale-90 opacity-50",
      )}
    >
      <div className="group border-border from-secondary/20 to-card flex h-full flex-col overflow-hidden">
        <div className="relative aspect-video w-full">
          <iframe
            src={embedUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 rounded-2xl h-full w-full"
          />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center text-center pt-5 md:pt-10">
          <h3 className="text-foreground line-clamp-1 text-2xl mb-2 font-semibold">
            {video.title}
          </h3>
          <p className="text-foreground/40 line-clamp-3 text-lg leading-relaxed">
            {video.description}
          </p>
          <Link
            href="https://youtube.com/@thevinayakgore?si=tPxmkjdEqZx37xtP"
            target="_blank"
            className="mt-auto flex items-center text-start gap-3 p-5 md:pt-10"
          >
            <Image
              src="/vinu.jpeg"
              alt="The Vinayak Gore"
              width={500}
              height={500}
              draggable={false}
              unoptimized
              className="size-13 border-3 border-primary/20 rounded-full object-cover select-none"
            />
            <div className="flex min-w-0 flex-col font-semibold">
              <span className="text-foreground truncate text-base font-semibold tracking-wide">
                The Vinayak Gore
              </span>
              <span className="text-foreground/40 text-sm tracking-wide">
                {formatDate(video.date)}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
});

// ─── Dot button (same) ────────────────────────────────────────────────────────
const DotButton = memo(function DotButton({
  index,
  selected,
  onSelect,
}: {
  index: number;
  selected: boolean;
  onSelect: (index: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      aria-label={`Go to video ${index + 1}`}
      className={cn(
        "h-3 rounded-full transition-all duration-300 ease-out",
        selected
          ? "bg-foreground shadow-lg shadow-foreground/30 w-25"
          : "bg-foreground/20 w-8",
      )}
    />
  );
});

// ─── Carousel with fixed dot count ───────────────────────────────────────────
const VideoCarousel = memo(function VideoCarousel() {
  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: 6000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    [],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(EMBLA_OPTIONS, [autoplay]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const totalSlides = YOUTUBE.length;

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const handleDotClick = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
      autoplay.reset();
    },
    [emblaApi, autoplay],
  );

  return (
    <div className="mt-12">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y gap-5 p-5 md:gap-10 md:p-10 lg:p-15">
          {YOUTUBE.map((item, index) => (
            <div
              key={item.id}
              className="min-w-0 shrink-0 grow-0 basis-[88%] sm:basis-[52%] lg:basis-[65%]"
            >
              <VideoCard video={item} active={index === selectedIndex} />
            </div>
          ))}
        </div>
      </div>

      <div className="m-auto flex items-center justify-center gap-3">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <DotButton
            key={index}
            index={index}
            selected={index === selectedIndex}
            onSelect={handleDotClick}
          />
        ))}
      </div>
    </div>
  );
});

// ─── Main component ───────────────────────────────────────────────────────────
function YouTubeCarousel() {
  return (
    <section
id="youtube"
      className="relative py-5 md:py-10 lg:py-20 max-w-360 m-auto w-full"
    >
      <h2 className="sansita-swashed text-center p-5 -mb-5 md:-mb-10 text-7xl md:text-[15rem] bg-clip-text text-transparent bg-linear-to-b from-primary/60 via-primary/20 to-transparent tracking-tighter font-light leading-none">
        Youtube
      </h2>
      <VideoCarousel />
    </section>
  );
}

export default memo(YouTubeCarousel);
