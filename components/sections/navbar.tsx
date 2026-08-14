"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { Menu, Minus, X } from "lucide-react";
import { NAVLINKS } from "@/lib/constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed bottom-5 left-0 z-1000! transform-gpu w-fit">
      <div className="flex flex-col items-end gap-3 p-5 w-full h-full">
        {/* Desktop Nav */}
        <div className="hidden md:flex flex-col gap-3 w-full h-full">
          {NAVLINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="flex items-center gap-2 font-medium opacity-20 hover:opacity-100 hover:text-orange-500 transition-all duration-500"
            >
              <Minus className="size-3.5" />
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-background/95 backdrop-blur-md border-t"
        >
          <div className="flex flex-col items-center py-6 gap-3">
            {NAVLINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-medium hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
