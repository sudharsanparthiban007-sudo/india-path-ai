const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateAppAssets() {
  const assetsDir = path.resolve(__dirname, '..', 'assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  console.log('🎨 Generating India Path AI branding assets for iOS and Android...');

  // SVG for 1024x1024 App Icon
  const iconSvg = `
  <svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0c0a09" />
        <stop offset="100%" stop-color="#1c1917" />
      </linearGradient>
      <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f97316" />
        <stop offset="50%" stop-color="#ea580c" />
        <stop offset="100%" stop-color="#f59e0b" />
      </linearGradient>
      <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f97316" stop-opacity="0.4" />
        <stop offset="100%" stop-color="#f59e0b" stop-opacity="0" />
      </linearGradient>
    </defs>
    <!-- Dark Background -->
    <rect width="1024" height="1024" fill="url(#bgGrad)" />
    
    <!-- Outer Glow Circle -->
    <circle cx="512" cy="512" r="420" fill="url(#glowGrad)" />
    
    <!-- App Badge (Rounded Rect) -->
    <rect x="232" y="232" width="560" height="560" rx="140" fill="url(#badgeGrad)" filter="drop-shadow(0 20px 30px rgba(249, 115, 22, 0.4))" />
    
    <!-- Temple / Monument Geometric Accent -->
    <path d="M 512 320 L 620 450 L 404 450 Z" fill="#ffffff" fill-opacity="0.95" />
    
    <!-- Stylized "IP" Letters -->
    <text x="512" y="650" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="190" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="-2">IP</text>
  </svg>
  `;

  // SVG for 2732x2732 Splash Screen
  const splashSvg = `
  <svg width="2732" height="2732" viewBox="0 0 2732 2732" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="splashBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#09090b" />
        <stop offset="100%" stop-color="#18181b" />
      </linearGradient>
      <linearGradient id="badgeGradSplash" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f97316" />
        <stop offset="50%" stop-color="#ea580c" />
        <stop offset="100%" stop-color="#f59e0b" />
      </linearGradient>
    </defs>
    <!-- Background -->
    <rect width="2732" height="2732" fill="url(#splashBg)" />
    
    <!-- Center Glow -->
    <circle cx="1366" cy="1200" r="600" fill="#f97316" fill-opacity="0.12" filter="blur(80px)" />
    
    <!-- Center Logo Badge -->
    <rect x="1146" y="980" width="440" height="440" rx="110" fill="url(#badgeGradSplash)" />
    <path d="M 1366 1060 L 1450 1160 L 1282 1160 Z" fill="#ffffff" fill-opacity="0.95" />
    <text x="1366" y="1320" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="150" font-weight="900" fill="#ffffff" text-anchor="middle">IP</text>
    
    <!-- App Title -->
    <text x="1366" y="1560" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="80" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="1">India Path AI</text>
    <text x="1366" y="1630" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="34" font-weight="500" fill="#a1a1aa" text-anchor="middle" letter-spacing="4">TAMIL NADU HERITAGE TRAVEL</text>
  </svg>
  `;

  // Render PNG files
  await sharp(Buffer.from(iconSvg)).png().toFile(path.join(assetsDir, 'icon-only.png'));
  await sharp(Buffer.from(iconSvg)).png().toFile(path.join(assetsDir, 'icon-foreground.png'));
  await sharp(Buffer.from(iconSvg)).png().toFile(path.join(assetsDir, 'icon-background.png'));
  await sharp(Buffer.from(splashSvg)).png().toFile(path.join(assetsDir, 'splash.png'));
  await sharp(Buffer.from(splashSvg)).png().toFile(path.join(assetsDir, 'splash-dark.png'));

  console.log('✅ Generated master icons and splash screens in /assets');
}

generateAppAssets().catch(console.error);
