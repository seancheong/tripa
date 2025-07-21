'use client';

import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default function Container({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <div
      className={`flex size-full ${pathname === '/dashboard/add' ? 'flex-row' : 'flex-col'}`}
    >
      {children}
    </div>
  );
}
