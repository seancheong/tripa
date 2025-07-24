'use client';

import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default function Container({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const isLocationAddEditPage =
    /^\/dashboard\/location\/[^/]+\/(add|edit)$/.test(pathname);

  return (
    <div
      className={`flex size-full ${pathname === '/dashboard/add' || isLocationAddEditPage ? 'flex-row' : 'flex-col'}`}
    >
      {children}
    </div>
  );
}
