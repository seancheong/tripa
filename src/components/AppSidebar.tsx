'use client';

import { useSidebar } from '@/contexts/sidebarContext';
import { useLocation } from '@/features/location/contexts/locationContext';
import {
  ArrowLeftIcon,
  CirclePlusIcon,
  EditIcon,
  LogOutIcon,
  MapIcon,
  MapPinPlusIcon,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

import SidebarButton from './SidebarButton';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarSeparator,
} from './ui/sidebar';

interface SidebarProps {
  locationList: ReactNode;
  logList: ReactNode;
}

export default function AppSidebar({ locationList, logList }: SidebarProps) {
  const { isSidebarOpen } = useSidebar();

  const pathname = usePathname();
  const isLocationPageSelected = pathname.startsWith('/dashboard/location/');

  // Prevent sidebar from rendering if it is null, to prevent flickering
  if (isSidebarOpen === null) return null;

  return (
    <Sidebar collapsible="icon" className="relative h-full">
      <SidebarContent>
        <SidebarTopSection isLocationPageSelected={isLocationPageSelected} />
        {isLocationPageSelected ? logList : locationList}
      </SidebarContent>

      <SidebarSeparator className="bg-border m-0" />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarButton
            href="/signout"
            label="Sign Out"
            icon={<LogOutIcon size={16} />}
          />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

interface SidebarTopSectionProps {
  isLocationPageSelected: boolean;
}

function SidebarTopSection({ isLocationPageSelected }: SidebarTopSectionProps) {
  const { selectedLocation } = useLocation();

  return isLocationPageSelected && selectedLocation ? (
    <SidebarGroup>
      <SidebarGroupLabel>Application</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarButton
            href="/dashboard"
            label="Back to Locations"
            icon={<ArrowLeftIcon size={16} />}
          />

          <SidebarButton
            href={`/dashboard/location/${selectedLocation.slug}`}
            label={selectedLocation.name}
            icon={<MapIcon size={16} />}
          />

          <SidebarButton
            href={`/dashboard/location/${selectedLocation.slug}/edit`}
            label="Edit Location"
            icon={<EditIcon size={16} />}
          />

          <SidebarButton
            href={`/dashboard/location/${selectedLocation.slug}/add`}
            label="Add Location Log"
            icon={<MapPinPlusIcon size={16} />}
          />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  ) : (
    <SidebarGroup>
      <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarButton
            href="/dashboard"
            label="Location"
            icon={<MapIcon size={16} />}
          />

          <SidebarButton
            href="/dashboard/add"
            label="Add Location"
            icon={<CirclePlusIcon size={16} />}
          />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
