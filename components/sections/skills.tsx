"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const OUTTER_LOOP = [
  {
    pos: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
    src: "nextjs.webp",
  }, // Top (0°)
  {
    pos: "top-[14.6%] right-[14.6%] -translate-y-1/2 translate-x-1/2",
    src: "react.webp",
  }, // Top-Right (45°)
  {
    pos: "top-1/2 right-0 translate-x-1/2 -translate-y-1/2",
    src: "motion.webp",
  }, // Right (90°)
  {
    pos: "bottom-[14.6%] right-[14.6%] translate-y-1/2 translate-x-1/2",
    src: "tailwindcss.webp",
  }, // Bottom-Right (135°)
  {
    pos: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
    src: "shadcnui.webp",
  }, // Bottom (180°)
  {
    pos: "bottom-[14.6%] left-[14.6%] translate-y-1/2 -translate-x-1/2",
    src: "typescript.webp",
  }, // Bottom-Left (225°)
  {
    pos: "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2",
    src: "sanity.webp",
  }, // Left (270°)
  {
    pos: "top-[14.6%] left-[14.6%] -translate-y-1/2 -translate-x-1/2",
    src: "strapi.webp",
  }, // Top-Left (315°)
];

const INNER_LOOP = [
  {
    pos: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
    src: "javascript.webp",
  }, // Top (0°)
  // {
  //   pos: "top-[14.6%] right-[14.6%] -translate-y-1/2 translate-x-1/2",
  //   src: "javascript.webp",
  // }, // Top-Right (45°)
  {
    pos: "top-1/2 right-0 translate-x-1/2 -translate-y-1/2",
    src: "threejs.webp",
  }, // Right (90°)
  // {
  //   pos: "bottom-[14.6%] right-[14.6%] translate-y-1/2 translate-x-1/2",
  //   src: "razorpay.webp",
  // }, // Bottom-Right (135°)
  {
    pos: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
    src: "mdx.webp",
  }, // Bottom (180°)
  // {
  //   pos: "bottom-[14.6%] left-[14.6%] translate-y-1/2 -translate-x-1/2",
  //   src: "clerk.webp",
  // }, // Bottom-Left (225°)
  {
    pos: "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2",
    src: "vercel.webp",
  }, // Left (270°)
  // {
  //   pos: "top-[14.6%] left-[14.6%] -translate-y-1/2 -translate-x-1/2",
  //   src: "vercel.webp",
  // }, // Top-Left (315°)
];

export default function Skills() {
  return (
    <section className="flex flex-col items-center justify-center m-auto max-w-360 w-full">
      <div className="aspect-video relative z-0 mt-auto overflow-hidden w-full max-w-7xl">
        <div className="absolute -bottom-1/3 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center justify-center m-auto gap-3 w-full h-full">
          <h2 className="text-2xl md:text-4xl text-center tracking-tight">
            Industry-Standard <br /> Techstacks for Development
          </h2>
          <p className="mt-3 text-base md:text-lg text-center opacity-50 max-w-2xl mx-auto">
            Build consistent, high-quality UI components using the frameworks,
            libraries, tools adopted by startups, agencies and freelance
            developers worldwide.
          </p>
        </div>

        {/* OUTTER LOOP */}
        <motion.div
          className="absolute bottom-2/3 translate-y-full left-1/2 -translate-x-1/2 z-10 flex border rounded-full size-300"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          {OUTTER_LOOP.map((item, i) => (
            <motion.div
              key={i}
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              className={`absolute ${item.pos} border rounded-xl overflow-hidden size-20`}
            >
              <Image
                src={`/icons/${item.src}`}
                alt="logos"
                width={1000}
                height={1000}
                priority
                unoptimized
                loading="eager"
                className="object-cover w-full h-full"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* INNER LOOP ONE */}
        <motion.div
          className="absolute bottom-1/2 translate-y-full left-1/2 -translate-x-1/2 z-20 flex border rounded-full size-230"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
        >
          {INNER_LOOP.map((item, i) => (
            <motion.div
              key={i}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
              className={`absolute ${item.pos} border rounded-xl overflow-hidden size-20`}
            >
              <Image
                src={`/icons/${item.src}`}
                alt="logos"
                width={1000}
                height={1000}
                priority
                unoptimized
                loading="eager"
                className="object-cover w-full h-full"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
