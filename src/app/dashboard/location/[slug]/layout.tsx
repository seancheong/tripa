import { PropsWithChildren } from 'react';

export default function LocationSlugLayout({ children }: PropsWithChildren) {
  return (
    <div className="container min-h-64 min-w-[448px] shrink-0 p-4">
      {children}
    </div>
  );
}
