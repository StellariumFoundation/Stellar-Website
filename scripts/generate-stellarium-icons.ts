import sharp from 'sharp';

const SRC = 'assets/logo.png';
const RES_DIR = 'StellariumCaller/app/src/main/res';

const DENSITIES = {
  'mipmap-mdpi':   { fg: 108, icon: 48 },
  'mipmap-hdpi':   { fg: 162, icon: 72 },
  'mipmap-xhdpi':  { fg: 216, icon: 96 },
  'mipmap-xxhdpi': { fg: 324, icon: 144 },
  'mipmap-xxxhdpi':{ fg: 432, icon: 192 },
};

async function main() {
  const src = await sharp(SRC);
  const meta = await src.metadata();
  console.log(`Source: ${meta.width}x${meta.height}, format: ${meta.format}\n`);

  for (const [dir, sizes] of Object.entries(DENSITIES)) {
    const base = `${RES_DIR}/${dir}`;
    await src.clone().resize(sizes.fg, sizes.fg, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toFile(`${base}/ic_launcher_foreground.webp`);
    await src.clone().resize(sizes.icon, sizes.icon, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toFile(`${base}/ic_launcher.webp`);
    await src.clone().resize(sizes.icon, sizes.icon, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toFile(`${base}/ic_launcher_round.webp`);
    console.log(`  ✓ ${dir} — fg:${sizes.fg}px, icon:${sizes.icon}px`);
  }

  console.log('\nDone — StellariumCaller icons regenerated.');
}

main().catch(console.error);
