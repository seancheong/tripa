'use client';

import type { User } from 'better-auth';
import { LogInIcon, LogOutIcon, Menu, UserIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface MobileMenuProps {
  user?: User;
}

export default function MobileMenu({ user }: MobileMenuProps) {
  const [isDark, setIsDark] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setIsDark(resolvedTheme === 'dark');
  }, [setIsDark, resolvedTheme]);

  const toggleTheme = (theme: 'light' | 'dark') => {
    setTheme(theme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-56">
        {user && (
          <>
            <DropdownMenuLabel>
              <div className="flex items-center gap-2">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={24}
                    height={24}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                ) : (
                  <UserIcon />
                )}
                {user.name}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={isDark ? 'dark' : 'light'}
          onValueChange={(theme) => toggleTheme(theme as 'light' | 'dark')}
        >
          <DropdownMenuRadioItem value="light">
            Light Mode
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark Mode</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />

        {user ? (
          <Link href="/signout" passHref>
            <DropdownMenuItem>
              <LogOutIcon /> Sign Out
            </DropdownMenuItem>
          </Link>
        ) : (
          <Link href="/signin" passHref>
            <DropdownMenuItem>
              <LogInIcon /> Sign In
            </DropdownMenuItem>
          </Link>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
