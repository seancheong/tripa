'use client';

import { useTheme } from 'next-themes';
import { PropsWithChildren, useEffect, useState } from 'react';

export default function MainContainer({ children }: PropsWithChildren) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div data-theme={theme} className="flex min-h-screen flex-col">
      {children}
    </div>
  );
}
