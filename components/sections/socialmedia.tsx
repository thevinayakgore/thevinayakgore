"use client";
import Link from "next/link";
import Image from "next/image";
import { SOCIALLINKS } from "@/registry/socialmedia";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function SocialMedia() {
  return (
    <aside className="fixed bottom-5 right-3 z-1000! transform-gpu w-fit">
      <div className="hidden md:flex flex-col gap-3 p-3 bg-background/20 backdrop-blur-[2px] rounded-lg w-full h-full">
        {SOCIALLINKS.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            target="_blank"
            aria-label={link.name}
            rel="noopener noreferrer"
            className="hover:scale-110 size-8 rounded-sm overflow-hidden transition-all duration-500"
          >
            <Tooltip>
              <TooltipTrigger>
                <Image
                  src={`/icons/${link.icon}`}
                  alt={link.name}
                  width={1000}
                  height={1000}
                  priority
                  unoptimized
                  loading="eager"
                  className="object-cover w-full h-full"
                />
              </TooltipTrigger>
              <TooltipContent
                side="left"
                className="absolute -top-4 right-4 z-50 px-3 py-1.5 text-sm font-medium w-max!"
              >
                {link.name}
              </TooltipContent>
            </Tooltip>
          </Link>
        ))}
      </div>
    </aside>
  );
}
