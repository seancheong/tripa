import NavBar from '@/components/NavBar';
import '@/utils/env';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import ClientProviders from './ClientProviders';
import MainContainer from './MainContainer';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  authors: { name: 'Sean Cheong Zhen Xiong' },
  title: 'Tripa',
  description: 'Keep track of your travels and adventures with Tripa',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProviders>
          <MainContainer>
            <NavBar />
            <main className="flex flex-1 flex-col">{children}</main>
          </MainContainer>
        </ClientProviders>
      </body>
    </html>
  );
}
