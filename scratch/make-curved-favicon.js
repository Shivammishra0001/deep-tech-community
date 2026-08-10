const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const inputPath = path.join(
  "C:",
  "Users",
  "yogeshwar pandey",
  ".gemini",
  "antigravity",
  "brain",
  "f3b90b20-3af1-42ba-83a6-1786b2bd2f68",
  ".user_uploaded",
  "media_1786347065793.png"
);

async function processFavicon() {
  console.log("Processing input image:", inputPath);
  const metadata = await sharp(inputPath).metadata();
  const width = metadata.width || 512;
  const height = metadata.height || 512;
  const size = Math.min(width, height);

  // Radius for curved edges (22% radius for modern squircle app icon curve)
  const radius = Math.round(size * 0.22);

  // SVG mask for rounded corners
  const roundedCornersSvg = Buffer.from(
    `<svg width="${size}" height="${size}">
      <rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="#fff"/>
    </svg>`
  );

  // Crop to square, resize to 512x512, apply rounded corners mask
  const curvedIconBuffer = await sharp(inputPath)
    .resize(size, size, { fit: "cover" })
    .composite([
      {
        input: roundedCornersSvg,
        blend: "dest-in",
      },
    ])
    .png()
    .toBuffer();

  const targets = [
    path.join(__dirname, "..", "src", "app", "icon.png"),
    path.join(__dirname, "..", "src", "app", "apple-icon.png"),
    path.join(__dirname, "..", "public", "favicon.png"),
  ];

  for (const target of targets) {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, curvedIconBuffer);
    console.log("Saved curved icon to:", target);
  }

  // Generate 64x64 favicon.ico and favicon.png
  const faviconSmall = await sharp(curvedIconBuffer).resize(64, 64).png().toBuffer();
  fs.writeFileSync(path.join(__dirname, "..", "src", "app", "favicon.ico"), faviconSmall);
  fs.writeFileSync(path.join(__dirname, "..", "public", "favicon.ico"), faviconSmall);
  console.log("Saved small favicon.ico to src/app/favicon.ico and public/favicon.ico");
}

processFavicon().catch((err) => {
  console.error("Error processing favicon:", err);
  process.exit(1);
});
