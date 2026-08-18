// app/api/bento-image/route.ts
import puppeteer from "puppeteer";
import { NextResponse } from "next/server";

export async function GET() {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });

    // Use your deployed URL or localhost
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    
    // Navigate to screenshot page
    await page.goto(`${baseUrl}/screenshot`, {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    // Wait for the card to be present
    await page.waitForSelector("#bento-card", { timeout: 10000 });

    // ⏳ Wait for loading states to complete
    // Check if loader is present and wait for it to disappear
    try {
      await page.waitForSelector(".loader, .animate-spin", { 
        timeout: 2000,
        hidden: true,
      });
    } catch {
      // If no loader found, continue
    }

    // Wait for stats data to be loaded (check for numbers instead of loaders)
    await page.waitForFunction(
      () => {
        const sections = document.querySelectorAll("#bento-card .text-3xl, #bento-card .text-5xl");
        if (sections.length === 0) return false;
        
        // Check if any section still has loading text or loader
        const hasLoader = document.querySelector(".loader, .animate-spin");
        if (hasLoader) return false;
        
        return true;
      },
      { timeout: 15000 }
    );

    // ⏳ Extra safety delay: wait 10 seconds for all data to be fully rendered
    console.log("⏳ Waiting 10 seconds for complete rendering...");
    await new Promise((resolve) => setTimeout(resolve, 10000));

    // Verify the card is fully rendered
    const card = await page.$("#bento-card");
    if (!card) throw new Error("Bento card not found");

    // Take screenshot
    const screenshot = await card.screenshot({ type: "png" });
    const buffer = Buffer.from(screenshot);

    await browser.close();

    // Return the image
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=60",
      },
    });
  } catch (error) {
    console.error("[Bento API] Error:", error);
    if (browser) await browser.close().catch(console.error);
    return new NextResponse(`Error: ${error}`, { status: 500 });
  }
}