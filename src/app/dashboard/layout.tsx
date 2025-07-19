import Sidebar from '@/components/Sidebar';
import { PropsWithChildren } from 'react';

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-1">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
