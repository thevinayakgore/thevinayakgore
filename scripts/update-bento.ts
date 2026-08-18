// scripts/update-bento.ts
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

async function updateBentoCard() {
  console.log("🔄 Generating Bento card...");

  try {
    // Launch browser
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });

    // ✅ Use your production URL
    const baseUrl = process.env.BASE_URL || "https://tvg.venumity.com";
    
    // Navigate to the screenshot page (which renders your component)
    await page.goto(`${baseUrl}/screenshot`, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    // Wait for the card to be present
    await page.waitForSelector("#bento-card", { timeout: 10000 });

    // Wait for loader to disappear
    try {
      await page.waitForSelector(".loader, .animate-spin", { 
        timeout: 2000,
        hidden: true,
      });
    } catch {
      // If no loader found, continue
    }

    // Wait for stats data to be loaded
    await page.waitForFunction(
      () => {
        const sections = document.querySelectorAll("#bento-card .text-3xl, #bento-card .text-5xl");
        if (sections.length === 0) return false;
        const hasLoader = document.querySelector(".loader, .animate-spin");
        if (hasLoader) return false;
        return true;
      },
      { timeout: 15000 }
    );

    // ⏳ Extra safety delay
    console.log("⏳ Waiting 10 seconds for complete rendering...");
    await new Promise((resolve) => setTimeout(resolve, 10000));

    const card = await page.$("#bento-card");
    if (!card) throw new Error("Bento card not found");

    // Take screenshot
    const screenshot = await card.screenshot({ type: "png" });
    const buffer = Buffer.from(screenshot);

    await browser.close();

    // Save to public directory
    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

    const imagePath = path.join(publicDir, "bento-card.png");
    fs.writeFileSync(imagePath, buffer);

    console.log(`✅ Bento card saved (${buffer.byteLength} bytes)`);

    if (process.env.GITHUB_ACTIONS) {
      const gitStatus = execSync("git status --porcelain", { encoding: "utf8" });
      if (gitStatus.includes("bento-card.png")) {
        execSync('git config user.name "github-actions[bot]"');
        execSync('git config user.email "github-actions[bot]@users.noreply.github.com"');
        execSync("git add public/bento-card.png");
        execSync('git commit -m "chore: update bento card [skip ci]"');
        execSync("git push");
        console.log("✅ Changes committed and pushed");
      } else {
        console.log("ℹ️ No changes to commit");
      }
    }
  } catch (error) {
    console.error("❌ Failed:", error);
    process.exit(1);
  }
}

updateBentoCard();