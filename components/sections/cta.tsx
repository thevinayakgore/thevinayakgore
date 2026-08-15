"use client";
import Link from "next/link";
import Image from "next/image";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { gitRepo } from "@/lib/brand";

const IMAGES = [
  "/thumbnails/card-1.png",
  "/thumbnails/card-2.png",
  "/thumbnails/card-3.png",
  "/thumbnails/card-4.png",
  "/thumbnails/card-5.png",
  "/thumbnails/card-6.png",
  "/thumbnails/card-7.png",
  "/thumbnails/card-8.png",
  "/thumbnails/card-9.png",
  "/thumbnails/card-10.png",
  "/thumbnails/card-11.png",
  "/thumbnails/card-12.png",
  "/thumbnails/card-13.png",
  "/thumbnails/card-14.png",
  "/thumbnails/card-15.png",
];

export default function CTA() {
  return (
    <section className="p-5 md:p-10 lg:py-20 select-none w-full">
      <div className="flex items-center justify-center m-auto max-w-360 w-full">
        <section className="relative group/logo flex items-start gap-5 md:gap-10 lg:gap-20 m-auto rounded-4xl bg-[radial-gradient(100%_100%_at_50%_0%,rgba(0,0,0,0)_31.25%,rgba(0,0,0,0.1)_100%),radial-gradient(200%_160%_at_-20%_-80%,#FFB457_0%,#FF6A00_100%)] after:pointer-events-none after:absolute after:inset-0 after:select-none after:bg-linear-to-b after:from-white/10 after:to-transparent p-10 md:p-15 shadow-xl/15 overflow-hidden max-w-6xl w-full min-h-120">
          {/* Glow overlay */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 mt-[calc(-280/16*1rem)] select-none overflow-hidden pl-[35%] mix-blend-overlay">
            <div className="relative ml-[calc(-544/16*1rem)] w-[calc(1458/16*1rem)] max-w-none">
              {/* Replace with your own glow asset or keep as gradient */}
              <div className="h-64 w-full bg-linear-to-r from-orange-400/30 to-amber-600/30 blur-3xl" />
            </div>
          </div>

          <div className="relative z-10 flex flex-col gap-5 text-white max-w-lg">
            <div className="space-y-5">
              <div className="text-balance text-3xl md:text-4xl lg:text-6xl font-semibold tracking-tight leading-none">
                <div className="text-transparent bg-clip-text bg-linear-to-br from-white/70 via-white to-white/30">
                  Ready to Build Something{" "}
                  <p className="sansita-swashed tracking-tight font-light -my-2 pb-3 text-2xl md:text-5xl lg:text-8xl w-fit">
                    Amazing ?
                  </p>
                </div>
              </div>
              <p className="text-lg leading-snug max-w-md">
                Let&apos;s collaborate on your next project. I&apos;m always
                open to exciting opportunities and interesting conversations.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/#contact"
                className="group relative isolate p-3! pl-5! inline-flex items-center justify-center overflow-hidden text-left text-base font-medium tracking-wide transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] before:transition-opacity before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] rounded-md text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1),0_1px_1px_-0.5px_rgba(0,0,0,0.03),0_2px_2px_-1px_rgba(0,0,0,0.03),0_4px_4px_-2px_rgba(0,0,0,0.03)] after:pointer-events-none after:absolute after:inset-0 after:rounded-md after:bg-linear-to-b after:from-white after:from-32% after:to-white/40 after:to-68% after:opacity-20"
              >
                Let&apos;s Get Develope
                <svg
                  viewBox="0 0 10 10"
                  aria-hidden="true"
                  className="ml-2 size-5 flex-none opacity-60 transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] group-hover:translate-x-6 group-hover:opacity-0"
                >
                  <path
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="m7.25 5-3.5-2.25v4.5L7.25 5Z"
                  />
                </svg>
                <svg
                  viewBox="0 0 10 10"
                  aria-hidden="true"
                  className="-ml-2.5 size-5 flex-none -translate-x-4 opacity-0 transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] group-hover:translate-x-0 group-hover:opacity-100"
                >
                  <path
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="m7.25 5-3.5-2.25v4.5L7.25 5Z"
                  />
                </svg>
              </Link>
              <Link
                href={gitRepo}
                target="_blank"
                className="group relative isolate p-3! pl-5! inline-flex items-center justify-center overflow-hidden text-left text-base font-medium tracking-wide transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] before:transition-opacity before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] rounded-md text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1),0_1px_1px_-0.5px_rgba(0,0,0,0.03),0_2px_2px_-1px_rgba(0,0,0,0.03),0_4px_4px_-2px_rgba(0,0,0,0.03)] after:pointer-events-none after:absolute after:inset-0 after:rounded-md after:bg-linear-to-b after:from-white after:from-32% after:to-white/40 after:to-68% after:opacity-20"
              >
                <svg viewBox="0 0 438.549 438.549" className="size-5">
                  <path
                    fill="currentColor"
                    d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
                  ></path>
                </svg>
                <span className="ml-3">Contribute</span>
                <svg
                  viewBox="0 0 10 10"
                  aria-hidden="true"
                  className="ml-2 size-5 flex-none opacity-60 transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] group-hover:translate-x-6 group-hover:opacity-0"
                >
                  <path
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="m7.25 5-3.5-2.25v4.5L7.25 5Z"
                  />
                </svg>
                <svg
                  viewBox="0 0 10 10"
                  aria-hidden="true"
                  className="-ml-2.5 size-5 flex-none -translate-x-4 opacity-0 transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] group-hover:translate-x-0 group-hover:opacity-100"
                >
                  <path
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="m7.25 5-3.5-2.25v4.5L7.25 5Z"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Large background logo/mark */}
          <div className="pointer-events-none absolute inset-y-0 select-none mask-[radial-gradient(55%_25%_at_70%_50%,#D9D9D9_12%,rgba(217,217,217,0.20)_67.6%,rgba(217,217,217,0)_100%)] sm:mask-[radial-gradient(60%_75%_at_55%_45%,#D9D9D9_12%,rgba(217,217,217,0.20)_67.6%,rgba(217,217,217,0)_100%)] -ml-[calc(410/16*1rem)] -mt-[calc(770/16*1rem)] aspect-1216/1484 h-[calc(1484/16*1rem)] w-[calc(1216/16*1rem)] sm:-ml-[calc(200/16*1rem)] sm:-mt-[calc(830/16*1rem)] sm:aspect-1216/1484 sm:h-[calc(1484/16*1rem)] sm:w-[calc(1216/16*1rem)] md:-ml-[calc(70/16*1rem)] md:-mt-[calc(770/16*1rem)] md:aspect-1216/1484 md:h-[calc(1484/16*1rem)] md:w-[calc(1216/16*1rem)] lg:-mt-[calc(830/16*1rem)] lg:ml-[calc(100/16*1rem)] lg:aspect-1316/1608 lg:h-[calc(1608/16*1rem)] lg:w-[calc(1316/16*1rem)]">
            {/* You can replace this with your own logo mark or keep a canvas effect */}
            <div className="relative h-full">
              <div className="absolute inset-0 top-1/3 right-1/3 translate-y-20 rotate-15 opacity-20 flex items-center justify-center transition-all duration-[2s]">
                <Image
                  src="/brand-icon1.png"
                  alt="Brand"
                  width={5000}
                  height={5000}
                  priority
                  unoptimized
                  loading="eager"
                  className="size-250"
                />
              </div>
            </div>
          </div>

          <div className="absolute -top-10 -right-1/4 -translate-x-1/7 scale-110 rotate-10 transform-gpu flex items-center gap-3 w-fit">
            <InfiniteMovingCards
              items={
                IMAGES.map((src) => ({ image: src })) as { image: string }[]
              }
              direction="down"
              speed="slow"
            />
            <InfiniteMovingCards
              items={
                IMAGES.map((src) => ({ image: src })) as { image: string }[]
              }
              direction="up"
              speed="slow"
            />
          </div>
        </section>
      </div>
    </section>
  );
}
