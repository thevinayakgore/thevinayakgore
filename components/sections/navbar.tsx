"use client";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Menu, Minus, X } from "lucide-react";
import { NAVLINKS } from "@/lib/constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = NAVLINKS.map((link) => link.href.replace("#", ""));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(targetId);
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed bottom-5 left-3 z-1000! transform-gpu w-fit">
      <div className="flex flex-col items-end gap-3 p-3 bg-background/60 backdrop-blur-[2px] rounded-lg w-full h-full">
        {/* Desktop Nav */}
        <div className="hidden md:flex flex-col gap-3 w-full h-full">
          {NAVLINKS.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`flex items-center gap-2 font-medium transition-all duration-500 ${
                  isActive
                    ? "opacity-100 text-orange-500"
                    : "opacity-20 hover:opacity-100 hover:text-orange-500"
                }`}
              >
                <Minus
                  className={`size-3.5 transition-all duration-500 ${
                    isActive ? "w-6" : "w-3.5"
                  }`}
                />
                {link.name}
              </a>
            );
          })}
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
          className="md:hidden bg-background/95 backdrop-blur-md border-t rounded-lg mt-2 p-4"
        >
          <div className="flex flex-col items-start gap-3">
            {NAVLINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`text-lg font-medium transition-colors ${
                    isActive ? "text-orange-500" : "hover:text-primary"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
