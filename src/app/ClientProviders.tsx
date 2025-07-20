'use client';

import { AuthProvider } from '@/contexts/authContext';
import { SidebarProvider } from '@/contexts/sidebarContext';
import { ThemeProvider } from 'next-themes';
import { PropsWithChildren } from 'react';

export default function ClientProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider defaultTheme="system" attribute="class" enableSystem>
      <AuthProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
