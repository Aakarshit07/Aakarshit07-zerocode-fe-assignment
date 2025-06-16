import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/hooks/use-auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ZeroCode Chatbot',
  description:
    'A production-ready chatbot application with authentication and AI-powered conversations',
  keywords: ['chatbot', 'AI', 'React', 'Next.js', 'TypeScript'],
  authors: [{ name: 'ZeroCode Team' }],
  viewport: 'width=device-width, initial-scale=1',
  generator: 'v0.dev',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
