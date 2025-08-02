'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Label } from './ui/label';
import { Switch } from './ui/switch';

export default function ThemeToggleButton() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setIsDark(resolvedTheme === 'dark');
    }
  }, [resolvedTheme, mounted]);

  if (!mounted) {
    return null; // Prevents hydration mismatch
  }

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return (
    <div
      className="mx-4 flex items-center space-x-2"
      aria-label="Toggle between light and dark theme"
    >
      <Label htmlFor="theme-toggle">
        <SunIcon
          size={18}
          aria-label="Light theme"
          className="text-muted-foreground"
        />
      </Label>
      <Switch
        id="theme-toggle"
        checked={isDark}
        onClick={toggleTheme}
        className="data-[state=checked]:bg-input"
        thumbClassName="dark:data-[state=checked]:bg-foreground"
      />
      <Label htmlFor="theme-toggle">
        <MoonIcon
          size={16}
          aria-label="Dark theme"
          className="text-muted-foreground"
        />
      </Label>
    </div>
  );
}
