'use client';

import SidebarButton from '@/components/SidebarButton';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CirclePlusIcon,
  LogOutIcon,
  MapIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const isSidebarOpenKey = 'isTripaSidebarOpen';

export default function DashboardPage() {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean | null>(null);

  const toggleSidebar = () => {
    if (isSidebarOpen === null) return;

    setSidebarOpen(!isSidebarOpen);
    localStorage.setItem(isSidebarOpenKey, String(!isSidebarOpen));
  };

  useEffect(() => {
    const saved = localStorage.getItem(isSidebarOpenKey);
    setSidebarOpen(saved === 'true');
  }, []);

  // Prevent sidebar from rendering if it is null, to prevent flickering
  if (isSidebarOpen === null) return null;

  return (
    <div className="flex flex-1">
      <div
        className={`bg-base-200 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-16'}`}
      >
        <div
          className={`flex p-2 ${isSidebarOpen ? 'justify-end' : 'justify-center'}`}
        >
          <button
            aria-label="Toggle sidebar"
            className="btn btn-circle"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <SidebarButton
            showLabel={isSidebarOpen}
            href="/dashboard"
            label="Location"
            icon={<MapIcon size={16} />}
          />

          <SidebarButton
            showLabel={isSidebarOpen}
            href="/dashboard"
            label="Add Location"
            icon={<CirclePlusIcon size={16} />}
          />

          <div className="divider" />

          <SidebarButton
            showLabel={isSidebarOpen}
            href="/signout"
            label="Sign Out"
            icon={<LogOutIcon size={16} />}
          />
        </div>
      </div>

      <div className="flex-1"></div>
    </div>
  );
}
