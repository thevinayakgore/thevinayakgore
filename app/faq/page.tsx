"use client";
import Script from "next/script";
import { useState } from "react";
import { ChevronUp } from "lucide-react";
import { FAQ_DATA } from "@/registry/faq";
import { motion, AnimatePresence } from "motion/react";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_DATA.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <Script id="breadcrumb-jsonld" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>

      <section
        id="faq"
        className="relative p-5 md:p-10 lg:p-20 md:pt-10! bg-foreground/5 w-full"
      >
        <div className="flex flex-col items-center m-auto gap-5 max-w-6xl w-full">
          <h2 className="sansita-swashed text-center p-5 text-7xl md:text-[15rem] bg-clip-text text-transparent bg-linear-to-b from-primary/60 via-primary/20 to-transparent tracking-tighter font-light leading-none">
            Queries
          </h2>

          <div className="flex flex-col gap-5 items-center justify-center font-medium max-w-3xl w-full">
            {FAQ_DATA.map((item, index) => {
              const IconComponent = item.icon;
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`relative group/faq bg-foreground/10 ${isOpen && "p-1"} cursor-pointer rounded-lg overflow-hidden transition-all duration-700 w-full`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className={`flex items-start justify-between cursor-pointer ${isOpen ? "p-1 pb-2" : "p-2"} transition-all duration-700 w-full`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-foreground text-secondary p-3 shadow-md/20 rounded-md shrink-0">
                        <IconComponent className="size-5" />
                      </div>
                      <h3 className="text-base md:text-lg font-medium">
                        {item.question}
                      </h3>
                    </div>

                    <div className="absolute top-4 right-10 shrink-0 opacity-20 group-hover/faq:opacity-100 transition-all duration-700">
                      <ChevronUp
                        className={`absolute inset-0 size-6 ${isOpen ? "rotate-y-180 rotate-x-180" : ""} transition-all duration-700`}
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          filter: "blur(15px)",
                          height: 0,
                        }}
                        animate={{
                          opacity: 1,
                          filter: "blur(0px)",
                          height: "auto",
                        }}
                        exit={{ opacity: 0, filter: "blur(15px)", height: 0 }}
                        transition={{
                          duration: 0.8,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="w-full"
                      >
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1],
                            delay: 0.2,
                          }}
                          className="text-sm md:text-[0.95rem] tracking-wider text-foreground/60 py-4 px-5 bg-background rounded-md"
                        >
                          {item.answer}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-60 bg-linear-to-l from-transparent via-primary to-transparent h-px w-full" />
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 blur-2xl opacity-20 bg-linear-to-l from-transparent via-primary to-transparent rounded-full h-20 w-full" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-60 bg-linear-to-l from-transparent via-primary to-transparent h-px w-full" />
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 blur-2xl opacity-20 bg-linear-to-l from-transparent via-primary to-transparent rounded-full h-20 w-full" />
      </section>
    </>
  );
}
