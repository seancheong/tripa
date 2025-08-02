import Header from '@/components/Header';
import { Toaster } from '@/components/ui/sonner';
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
  title: 'Tripa',
  description: 'Keep track of your travels and adventures with Tripa',
  authors: [{ name: 'Sean Cheong Zhen Xiong' }],
  generator: 'Next.js',
  applicationName: 'Tripa',
  keywords: ['travel', 'log', 'map', 'location', 'Tripa'],
  creator: 'Sean Cheong Zhen Xiong',
  publisher: 'Tripa',
  metadataBase: new URL('https://tripa-six.vercel.app'),
  openGraph: {
    title: 'Tripa',
    description: 'Keep track of your travels and adventures with Tripa',
    url: 'https://tripa-six.vercel.app',
    siteName: 'Tripa',
    images: [
      {
        url: '/og-home.png',
        width: 1200,
        height: 630,
        alt: 'Tripa Open Graph Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tripa',
    description: 'Keep track of your travels and adventures with Tripa',
    site: '@tripaapp',
    creator: '@seancheong',
    images: ['/og-home.png'],
  },
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
            <Header />
            <main className="flex flex-1 flex-col">{children}</main>
            <Toaster richColors position="top-center" />
          </MainContainer>
        </ClientProviders>
      </body>
    </html>
  );
}
