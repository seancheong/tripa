import { getSession } from '@/utils/auth';
import { LogInIcon, LogOutIcon, MapPin, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import MobileMenu from './MobileMenu';
import ThemeToggleButton from './ThemeToggleButton';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export default async function Header() {
  const session = await getSession();

  return (
    <nav>
      <div className="px-4">
        <div className="flex h-16 items-center justify-between sm:h-20">
          <Link href="/" className="group flex items-center space-x-2">
            <div className="from-primary flex h-8 w-8 transform items-center justify-center rounded-xl bg-gradient-to-br to-orange-600 transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10">
              <MapPin className="h-4 w-4 text-white sm:h-5 sm:w-5" />
            </div>
            <span className="text-gradient-orange text-xl font-bold sm:text-2xl">
              Tripa
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-6 md:flex">
            <ThemeToggleButton />

            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-fit">
                    <div className="h-8 w-8 rounded-full ring-2 ring-[hsl(var(--primary))] ring-offset-2 dark:ring-offset-[hsl(var(--background))]">
                      {session.user.image ? (
                        <Image
                          src={session.user.image}
                          alt={session.user.name}
                          width={24}
                          height={24}
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-orange-600">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <span className="font-medium text-gray-900 dark:text-[hsl(var(--foreground))]">
                      {session.user.name}
                    </span>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48">
                  <Link href="/signout" passHref>
                    <DropdownMenuItem>
                      <LogOutIcon /> Sign Out
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/signin" passHref>
                <Button>
                  <LogInIcon /> Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <MobileMenu user={session?.user} />
        </div>
      </div>
    </nav>
  );
}
