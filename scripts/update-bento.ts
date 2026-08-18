// scripts/update-bento.ts
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

async function updateBentoCard() {
  try {
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    console.log(`📍 Fetching from: ${baseUrl}/api/bento-image`);

    // ⏳ Wait 6 seconds before fetching (in case API needs time)
    console.log("⏳ Waiting 6 seconds before fetching image...");
    await new Promise((resolve) => setTimeout(resolve, 6000));

    const response = await fetch(`${baseUrl}/api/bento-image`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();

    if (buffer.byteLength < 1000) {
      throw new Error("Image too small – likely corrupted");
    }

    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

    const imagePath = path.join(publicDir, "bento-card.png");
    fs.writeFileSync(imagePath, Buffer.from(buffer));

    console.log(`✅ Bento card saved (${buffer.byteLength} bytes)`);

    if (process.env.GITHUB_ACTIONS) {
      execSync('git config user.name "github-actions[bot]"');
      execSync('git config user.email "github-actions[bot]@users.noreply.github.com"');
      execSync("git add public/bento-card.png");
      execSync('git commit -m "chore: update bento card [skip ci]"');
      execSync("git push");
      console.log("✅ Changes committed");
    }
  } catch (error) {
    console.error("❌ Failed:", error);
    process.exit(1);
  }
}

updateBentoCard();