import type { Metadata } from 'next';
import './globals.css';
import { LangProvider } from '@/lib/LangContext';
import AuthProvider from '@/components/AuthProvider';
import NavBar from '@/components/NavBar';
import AskAssistantWidget from '@/components/AskAssistantWidget';

export const metadata: Metadata = {
  title: 'India Path AI — Tamil Nadu Heritage Travel',
  description:
    'AI-powered heritage travel companion for Tamil Nadu. Plan trips, explore monuments, book tours, and navigate with confidence.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-950 text-stone-100 antialiased">
        <AuthProvider>
          <LangProvider>
            <NavBar />
            <main className="pt-16">{children}</main>
            <AskAssistantWidget />
          </LangProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
