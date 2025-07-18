'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

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
    <label
      className="label mx-4 items-center"
      aria-label="Toggle between light and dark theme"
    >
      <SunIcon size={16} aria-label="Light theme" />
      <input
        type="checkbox"
        checked={isDark}
        onChange={toggleTheme}
        className="toggle toggle-sm border-white bg-black text-white checked:border-white checked:bg-black checked:text-white"
      />
      <MoonIcon size={16} aria-label="Dark theme" />
    </label>
  );
}
