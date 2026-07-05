import sharp from 'sharp';

const size = 1024;
const padding = 0.15;
const logoSize = Math.round(size * (1 - padding * 2));
const offset = Math.round(size * padding);

const circleSvg = Buffer.from(
  `<svg width="${size}" height="${size}">
    <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#1D0024" />
  </svg>`
);

const logo = await sharp('assets/logo.png')
  .resize(logoSize, logoSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .toBuffer();

for (const file of ['assets/icon-foreground.png', 'assets/icon-background.png']) {
  await sharp({ create: { width: size, height: size, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([
      { input: circleSvg, top: 0, left: 0 },
      { input: logo, top: offset, left: offset },
    ])
    .png()
    .toFile(file);
}

console.log('Created circular icons (both foreground and background)');
