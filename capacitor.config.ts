import type { CapacitorConfig } from '@capacitor/cli';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local and .env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

/**
 * Capacitor Configuration for India Path AI
 *
 * NOTE: This app uses Next.js server-side API routes, SQLite database via Prisma,
 * and server-side Gemini AI & Stripe secret keys.
 * Therefore, in native iOS and Android shells, it connects directly to the live
 * Next.js server via `server.url: process.env.CAPACITOR_SERVER_URL` instead of
 * bundling a static export.
 *
 * For local development:
 * Set CAPACITOR_SERVER_URL=http://<YOUR_LOCAL_IP>:3000 in .env.local
 * (e.g., http://192.168.1.100:3000) so a real phone or simulator can connect.
 */
const serverUrl =
  process.env.CAPACITOR_SERVER_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://indiapath.ai'
    : 'http://localhost:3000');

const config: CapacitorConfig = {
  appId: 'ai.indiapath.app',
  appName: 'India Path AI',
  webDir: 'public',
  server: {
    url: serverUrl,
    cleartext: true, // Allows HTTP connection on local network during development
    androidScheme: 'http',
    allowNavigation: [
      '10.195.25.152:3000',
      '10.195.25.152:*',
      '10.*',
      '192.168.*',
      'localhost:3000',
      'localhost:*',
      '*.google.com',
      '*.googleapis.com',
      '*.gstatic.com',
      '*.stripe.com',
    ],
  },
  plugins: {
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#f97316',
      sound: 'beep.wav',
    },
    Camera: {
      // Configuration for Camera plugin
    },
    Geolocation: {
      // Configuration for Geolocation plugin
    },
  },
};

export default config;
