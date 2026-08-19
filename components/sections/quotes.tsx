// components/sections/quotes.tsx
"use client";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { getDailyQuote, type Quote } from "@/utils/quotes";

export default function Quotes() {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadQuote = () => {
      const quote = getDailyQuote();
      setCurrentQuote(quote);
      setLoading(false);
    };

    loadQuote();

    // Calculate time until next midnight for quote refresh
    const now = new Date();
    const tomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      0,
    );
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    // Set timeout to refresh quote at midnight
    const timeoutId = setTimeout(() => {
      loadQuote();

      // After first refresh, set interval to refresh every 24 hours
      const intervalId = setInterval(loadQuote, 24 * 60 * 60 * 1000);

      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    }, timeUntilMidnight);

    // Cleanup timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, []);

  if (loading || !currentQuote) {
    return (
      <section className="flex items-center justify-center m-auto text-center gap-2 animate-pulse ml-3 py-5 md:py-10 mb-5 md:mb-10">
        <Loader className="size-6! animate-spin" />
        <span className="text-xl">Loading quote...</span>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-start justify-start text-start gap-3 ml-3 py-5 md:py-10 w-150">
      <h1 className="text-3xl font-medium">&quot;{currentQuote.item}&quot;</h1>
      <h3 className="text-xl text-foreground/50">
        &quot;{currentQuote.mean}&quot;
      </h3>
      <div className="flex items-center gap-5 ml-auto mt-5">
        <span className="text-xl leading-none">✨ {currentQuote.author}</span>
        <span className="capitalize px-4 py-1 bg-foreground/10 backdrop-blur-md font-semibold rounded-full">
          {currentQuote.category}
        </span>
      </div>
    </section>
  );
}
