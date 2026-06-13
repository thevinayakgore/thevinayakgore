// @ts-ignore
import { readFileSync, writeFileSync } from "node:fs";

const API_URL = "https://opbento.vercel.app/api/bento?n=Vinayak%20Gore&g=thevinayakgore&x=thevinayakgore&l=thevinayakgore&i=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F137513396%3Fv%3D4&p=https%3A%2F%2Fui.venumity.com&z=46b7a";

async function fetchBentoUrl(): Promise<string> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`Bento API error: ${res.status}`);
  const data = (await res.json()) as { url: string };
  return data.url;
}

async function updateReadme() {
  let baseUrl = await fetchBentoUrl();

  // Add cache‑busting timestamp (daily unique parameter)
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const separator = baseUrl.includes('?') ? '&' : '?';
  const newUrl = `${baseUrl}${separator}cache=${today}`;

  let readme = readFileSync("README.md", "utf-8");
  const regex = /\[!\[OpBento\]\([^)]+\)\]\(https:\/\/opbento\.vercel\.app\)/;
  const replacement = `[![OpBento](${newUrl})](https://opbento.vercel.app)`;

  if (regex.test(readme)) {
    readme = readme.replace(regex, replacement);
    writeFileSync("README.md", readme, "utf-8");
    console.log("✅ OpBento image URL updated with cache-buster");
  } else {
    console.warn("⚠️ Pattern not found – check the exact line in README.md");
  }
}

await updateReadme();