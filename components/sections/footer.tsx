"use client";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { handle, username } from "@/lib/brand";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  
  if (pathname?.startsWith("/screenshot")) return null;

  return (
    <footer className="p-5 md:pb-10 pt-0! text-xs text-foreground/50 font-medium max-w-360 m-auto w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 p-5 leading-none bg-foreground/10 border-2 border-background ring-3 ring-foreground/10 rounded-xl max-w-6xl m-auto w-full">
        <span className="flex items-center whitespace-nowrap">
          <span className="text-base leading-none mr-1">©</span>
          {currentYear} The Vinayak Gore
          <Separator
            orientation="vertical"
            className="mx-2 sm:mx-3 bg-foreground/30 min-h-4 sm:min-h-5!"
          />
          All rights reserved
        </span>
        <span>
          Building in public at{" "}
          <Link
            href={handle}
            target="_blank"
            className="text-orange-500 hover:underline"
          >
            @{username}
          </Link>
        </span>
      </div>
    </footer>
  );
}
