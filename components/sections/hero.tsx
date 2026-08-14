"use client";
import { ArrowRight, Github } from "lucide-react";
import ThemeToggle from "./themetoggle";
import Image from "next/image";
import { username } from "@/lib/brand";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative aspect-16/10 flex flex-col items-center justify-center text-center m-auto max-w-360 overflow-hidden w-full h-full"
    >
      <ThemeToggle />

      <h1 className="black-ops-one absolute -top-5 left-5 text-center text-6xl md:text-9xl lg:text-[40rem] opacity-10 font-light uppercase tracking-tight leading-none">
        TVG
      </h1>

      <div className="flex items-start justify-end m-auto max-w-6xl w-full h-full">
        <div className="flex flex-col items-start justify-center text-start mt-auto lg:pb-15 gap-5 w-full">
          <h2 className="text-4xl md:text-5xl lg:text-8xl font-semibold leading-none w-full">
            Namaste ⚡️
          </h2>
          <h3 className="text-xl md:text-2xl leading-none">
            Frontend Engineer & Creator Of Venumity
          </h3>
          <p className="text-base text-muted-foreground max-w-md">
            Building exceptional digital experiences with modern web
            technologies. Passionate about clean code and minimal design system.
          </p>
          <div className="flex flex-wrap gap-3 mt-3">
            <Link href="#projects">
              <Button className="group p-5! font-semibold bg-foreground! text-secondary!">
                View Projects
                <ArrowRight className="group-hover:translate-x-3 transition-all duration-500" />
              </Button>
            </Link>
            <Link href="#projects">
              <Button variant="outline" className="group p-5! font-semibold">
                <Github />
                GitHub
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col items-center justify-center m-auto w-full h-full">
          <div className="absolute bottom-0 right-0 z-0 grayscale-100 ml-auto w-1/2">
            <Image
              src="/vinugore.png"
              alt={username}
              width={2000}
              height={2000}
              priority
              unoptimized
              loading="eager"
              className="object-cover w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
