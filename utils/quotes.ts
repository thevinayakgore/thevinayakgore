// utils/quotes.ts
import quotesData from "@/registry/quotes.json";

export interface Quote {
  item: string;
  mean: string;
  author: string;
  category: string;
}

/**
 * Detect if text contains Devanagari script
 */
export function isDevanagari(text: string): boolean {
  const devanagariRegex = /[\u0900-\u097F]/;
  return devanagariRegex.test(text);
}

/**
 * Get a seeded random number for consistent daily quotes
 */
export function getSeededRandom(seed: number, min: number, max: number): number {
  const x = Math.sin(seed) * 10000;
  const random = x - Math.floor(x);
  return Math.floor(random * (max - min + 1)) + min;
}

/**
 * Get today's daily quote based on a 5-day cycle
 */
export function getDailyQuote(): Quote {
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
  const cyclePosition = dayOfYear % 5;
  const cycleNumber = Math.floor(dayOfYear / 5);

  let selectedQuote: Quote;

  if (cyclePosition < 3) {
    // Days 0-2: Sanskrit/Marathi quotes (Devanagari script)
    const quoteIndex = getSeededRandom(
      cycleNumber * 100 + cyclePosition,
      0,
      indianQuotes.length - 1
    );
    selectedQuote = indianQuotes[quoteIndex] || indianQuotes[0];
  } else {
    // Days 3-4: English quotes
    const quoteIndex = getSeededRandom(
      cycleNumber * 100 + cyclePosition,
      0,
      englishQuotes.length - 1
    );
    selectedQuote = englishQuotes[quoteIndex] || englishQuotes[0];
  }

  return selectedQuote;
}