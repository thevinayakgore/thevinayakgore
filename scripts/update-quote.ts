import * as fs from "fs";
import * as path from "path";

interface Quote {
  quote: string;
  author: string;
}

async function updateQuote() {
  try {
    // Load quotes from JSON file
    const quotesPath = path.join(__dirname, "quotes.json");
    const quotes: Quote[] = JSON.parse(fs.readFileSync(quotesPath, "utf-8"));

    // Get a random quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const { quote, author } = quotes[randomIndex];

    // Create the quote card with dark theme
    const cardDesign = `
<!--STARTS_HERE_QUOTE_CARD-->
<p align="center">
    <img src="https://readme-daily-quotes.vercel.app/api?author=${encodeURIComponent(
      author
    )}&quote=${encodeURIComponent(
      quote
    )}&theme=dark&bg_color=220a28&author_color=ffeb95&accent_color=c56a90" alt="Daily Quote">
</p>
<!--ENDS_HERE_QUOTE_CARD-->
`;

    const readmePath = path.join(__dirname, "..", "README.md");
    let readmeContent = fs.readFileSync(readmePath, "utf-8");

    // Replace the quote section using regex
    const regex =
      /<!--STARTS_HERE_QUOTE_CARD-->[\s\S]*?<!--ENDS_HERE_QUOTE_CARD-->/;

    if (regex.test(readmeContent)) {
      readmeContent = readmeContent.replace(regex, cardDesign.trim());
      fs.writeFileSync(readmePath, readmeContent, "utf-8");
      console.log("Quote updated successfully !");
    } else {
      console.error("Quote card markers not found in README.md");
      // Add the quote card section if it doesn't exist
      readmeContent += `\n\n${cardDesign}\n`;
      fs.writeFileSync(readmePath, readmeContent, "utf-8");
      console.log("Added quote card section to README.md");
    }
  } catch (error) {
    console.error("Error updating quote :", error);
    process.exit(1);
  }
}

updateQuote();
