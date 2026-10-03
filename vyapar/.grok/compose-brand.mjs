import { readFileSync, writeFileSync } from "node:fs";
import { chromium } from "playwright";

const BG = "/workspace/.grok/og-bg.png";
const FRAUNCES = "/workspace/.grok/fonts/Fraunces-SemiBold.ttf";
const SOURCE = "/workspace/.grok/fonts/SourceSans3-MediumItalic.ttf";

const MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
  <rect width="16" height="16" rx="3.5" fill="#1F4F47"/>
  <rect x="4" y="3" width="8" height="10" rx="1" fill="#FFFDF8"/>
  <rect x="4" y="3" width="2" height="10" fill="#1F4F47"/>
  <rect x="7" y="5.5" width="4" height="1.25" fill="#1F4F47"/>
  <rect x="7" y="8.25" width="4" height="1.25" fill="#1F4F47"/>
  <rect x="7" y="11" width="3" height="1.25" fill="#1F4F47"/>
</svg>`;

function dataUrl(path, mime) {
  return `data:${mime};base64,${readFileSync(path).toString("base64")}`;
}

const ogHtml = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
@font-face {
  font-family: "Fraunces";
  font-style: normal;
  font-weight: 600;
  src: url("${dataUrl(FRAUNCES, "font/ttf")}") format("truetype");
}
@font-face {
  font-family: "Source Sans 3";
  font-style: italic;
  font-weight: 500;
  src: url("${dataUrl(SOURCE, "font/ttf")}") format("truetype");
}
html, body {
  margin: 0;
  padding: 0;
  width: 1200px;
  height: 630px;
  overflow: hidden;
  background: #F3F0E8;
}
.card {
  position: relative;
  width: 1200px;
  height: 630px;
  background-image: url("${dataUrl(BG, "image/png")}");
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 160px 24px;
  box-sizing: border-box;
}
.wash {
  position: absolute;
  left: 50%;
  top: 48%;
  transform: translate(-50%, -50%);
  width: 860px;
  height: 420px;
  background: radial-gradient(ellipse at center,
    rgba(255,253,248,0.92) 0%,
    rgba(243,240,232,0.62) 42%,
    rgba(243,240,232,0.0) 72%);
  pointer-events: none;
}
.lockup {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.mark {
  width: 44px;
  height: 44px;
  margin: 0 0 18px;
  display: block;
  filter: drop-shadow(0 1px 0 rgba(26,25,22,0.08));
}
.title {
  font-family: Fraunces, "Liberation Serif", serif;
  font-weight: 600;
  font-size: 104px;
  line-height: 0.94;
  color: #1A1916;
  letter-spacing: -0.03em;
  margin: 0;
  text-align: center;
  font-kerning: normal;
}
.rule {
  width: 52px;
  height: 2px;
  background: #1F4F47;
  margin: 22px 0 16px;
  border-radius: 1px;
  opacity: 0.9;
}
.sub {
  font-family: "Source Sans 3", "Liberation Sans", sans-serif;
  font-style: italic;
  font-weight: 500;
  font-size: 26px;
  line-height: 1.3;
  color: #1F4F47;
  letter-spacing: 0.04em;
  margin: 0;
  text-align: center;
}
</style>
</head>
<body>
  <div class="card">
    <div class="wash"></div>
    <div class="lockup">
      ${MARK_SVG.replace('width="16" height="16"', 'class="mark" width="44" height="44"')}
      <h1 class="title">VyaparOS</h1>
      <div class="rule"></div>
      <p class="sub">Hisab bhi Smart, Business bhi Smart.</p>
    </div>
  </div>
</body>
</html>`;

const iconHtml = (size) => `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
  html, body { margin: 0; padding: 0; width: ${size}px; height: ${size}px; overflow: hidden; background: transparent; }
  svg { display: block; width: ${size}px; height: ${size}px; }
</style>
</head>
<body>${MARK_SVG.replace('width="16" height="16"', `width="${size}" height="${size}"`)}</body>
</html>`;

const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

async function shot(html, w, h, out) {
  const page = await browser.newPage({
    viewport: { width: w, height: h },
    deviceScaleFactor: 1,
  });
  await page.setContent(html, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(80);
  await page.screenshot({ path: out, type: "png", omitBackground: false });
  await page.close();
}

await shot(ogHtml, 1200, 630, "/workspace/.grok/og-composited.png");
await shot(iconHtml(16), 16, 16, "/workspace/.grok/favicon-16.png");
await shot(iconHtml(32), 32, 32, "/workspace/.grok/favicon-32.png");
await shot(iconHtml(192), 192, 192, "/workspace/.grok/icon-192.png.tmp");
await shot(iconHtml(512), 512, 512, "/workspace/.grok/icon-512.png.tmp");

await browser.close();
writeFileSync(
  "/workspace/.grok/favicon.svg.tmp",
  `<?xml version="1.0" encoding="UTF-8"?>
${MARK_SVG}
`,
);
console.log("composed");
