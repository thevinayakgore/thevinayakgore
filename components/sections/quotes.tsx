// components/sections/quotes.tsx
import { useEffect, useState } from "react";
import quotesData from "@/registry/quotes.json";
import { Loader } from "lucide-react";

// Type definitions
interface Quote {
  item: string;
  mean: string;
  author: string;
  category: string;
}

export default function Quotes() {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Helper function to detect if text contains Devanagari script
    const isDevanagari = (text: string): boolean => {
      const devanagariRegex = /[\u0900-\u097F]/;
      return devanagariRegex.test(text);
    };

    // Helper function to get a seeded random number for consistent daily quotes
    const getSeededRandom = (
      seed: number,
      min: number,
      max: number,
    ): number => {
      // Simple linear congruential generator for consistent random numbers
      const x = Math.sin(seed) * 10000;
      const random = x - Math.floor(x);
      return Math.floor(random * (max - min + 1)) + min;
    };

    const getDailyQuote = (): Quote => {
      const quotes: Quote[] = quotesData as Quote[];

      // Separate quotes by language
      const indianQuotes = quotes.filter((quote) => isDevanagari(quote.item));
      const englishQuotes = quotes.filter((quote) => !isDevanagari(quote.item));

      // Get today's date and create a unique day identifier
      const today = new Date();
      const startOfYear = new Date(today.getFullYear(), 0, 0);
      const diff = today.getTime() - startOfYear.getTime();
      const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

      // Create a 5-day cycle
      const cyclePosition = dayOfYear % 5; // 0, 1, 2, 3, 4
      const cycleNumber = Math.floor(dayOfYear / 5); // Which 5-day cycle we're in

      let selectedQuote: Quote;

      if (cyclePosition < 3) {
        // Days 0-2: Sanskrit/Marathi quotes (Devanagari script)
        const quoteIndex = getSeededRandom(
          cycleNumber * 100 + cyclePosition,
          0,
          indianQuotes.length - 1,
        );
        selectedQuote = indianQuotes[quoteIndex];
      } else {
        // Days 3-4: English quotes
        const quoteIndex = getSeededRandom(
          cycleNumber * 100 + cyclePosition,
          0,
          englishQuotes.length - 1,
        );
        selectedQuote = englishQuotes[quoteIndex];
      }

      return selectedQuote;
    };

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
