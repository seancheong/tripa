'use client';

import { AuthProvider } from '@/contexts/authContext';
import { ThemeProvider } from 'next-themes';
import { PropsWithChildren } from 'react';

export default function ClientProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider defaultTheme="system" attribute="class" enableSystem>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
