'use client';

import { useSidebar } from '@/contexts/sidebarContext';
import { useLocation } from '@/features/location/contexts/locationContext';
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CirclePlusIcon,
  EditIcon,
  LogOutIcon,
  MapIcon,
  MapPinPlusIcon,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

import SidebarButton from './SidebarButton';

interface SidebarProps {
  locationList: ReactNode;
  logList: ReactNode;
}

export default function Sidebar({ locationList, logList }: SidebarProps) {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  const pathname = usePathname();
  const isLocationPageSelected = pathname.startsWith('/dashboard/location/');

  // Prevent sidebar from rendering if it is null, to prevent flickering
  if (isSidebarOpen === null) return null;

  return (
    <div
      className={`bg-base-200 shrink-0 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-16'}`}
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
        <SidebarTopSection
          isSidebarOpen={isSidebarOpen}
          isLocationPageSelected={isLocationPageSelected}
        />

        {isLocationPageSelected ? logList : locationList}

        <div className="divider" />

        <SidebarButton
          showLabel={isSidebarOpen}
          href="/signout"
          label="Sign Out"
          icon={<LogOutIcon size={16} />}
        />
      </div>
    </div>
  );
}

interface SidebarTopSectionProps {
  isSidebarOpen: boolean;
  isLocationPageSelected: boolean;
}

function SidebarTopSection({
  isSidebarOpen,
  isLocationPageSelected,
}: SidebarTopSectionProps) {
  const { selectedLocation } = useLocation();

  return isLocationPageSelected && selectedLocation ? (
    <>
      <SidebarButton
        showLabel={isSidebarOpen}
        href="/dashboard"
        label="Back to Locations"
        icon={<ArrowLeftIcon size={16} />}
      />

      <SidebarButton
        showLabel={isSidebarOpen}
        href={`/dashboard/location/${selectedLocation.slug}`}
        label={selectedLocation.name}
        icon={<MapIcon size={16} />}
      />

      <SidebarButton
        showLabel={isSidebarOpen}
        href={`/dashboard/location/${selectedLocation.slug}/edit`}
        label="Edit Location"
        icon={<EditIcon size={16} />}
      />

      <SidebarButton
        showLabel={isSidebarOpen}
        href={`/dashboard/location/${selectedLocation.slug}/add`}
        label="Add Location Log"
        icon={<MapPinPlusIcon size={16} />}
      />
    </>
  ) : (
    <>
      <SidebarButton
        showLabel={isSidebarOpen}
        href="/dashboard"
        label="Location"
        icon={<MapIcon size={16} />}
      />

      <SidebarButton
        showLabel={isSidebarOpen}
        href="/dashboard/add"
        label="Add Location"
        icon={<CirclePlusIcon size={16} />}
      />
    </>
  );
}
