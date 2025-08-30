import * as fs from 'fs';
import * as path from 'path';

interface Quote {
  quote: string;
  author: string;
}

// Load quotes from JSON file
const quotesPath = path.join(__dirname, 'quotes.json');
const quotesData = JSON.parse(fs.readFileSync(quotesPath, 'utf8'));
const quotes: Quote[] = quotesData;

// Function to get a consistent daily quote (changes once per day)
function getDailyQuote(): Quote {
  const today = new Date();
  // Use the day of the year to select a quote (0-365)
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  const quoteIndex = dayOfYear % quotes.length;
  return quotes[quoteIndex];
}

async function updateQuote(): Promise<void> {
  try {
    const { quote, author } = getDailyQuote();

    // Create the black and white themed quote card
    const cardDesign = `
<!--STARTS_HERE_QUOTE_CARD-->
<p align="center">
  <img src="https://readme-daily-quotes.vercel.app/api?author=${encodeURIComponent(author)}&quote=${encodeURIComponent(quote)}&theme=light&bg_color=000000&author_color=ffffff&accent_color=ffffff" style="border: 6px solid #ffffff; border-radius: 10px;">
</p>
<!--ENDS_HERE_QUOTE_CARD-->
`;

    const readmePath = path.join(__dirname, '..', 'README.md');
    let readmeContent = fs.readFileSync(readmePath, 'utf-8');

    // Replace the quote section
    const regex = /<!--STARTS_HERE_QUOTE_CARD-->[\s\S]*?<!--ENDS_HERE_QUOTE_CARD-->/;
    readmeContent = readmeContent.replace(regex, cardDesign.trim());

    fs.writeFileSync(readmePath, readmeContent, 'utf-8');
    console.log('Quote updated successfully!');
  } catch (error) {
    console.error('Error updating quote:', error);
  }
}

updateQuote();
