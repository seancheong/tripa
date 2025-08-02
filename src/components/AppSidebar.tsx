'use client';

import { useSidebar } from '@/contexts/sidebarContext';
import { CirclePlusIcon, LogOutIcon, MapIcon } from 'lucide-react';
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

  // Prevent sidebar from rendering if it is null, to prevent flickering
  if (isSidebarOpen === null) return null;

  return (
    <Sidebar collapsible="icon" className="relative h-full">
      <SidebarContent>
        <SidebarTopSection />
        {locationList}
        {logList}
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

function SidebarTopSection() {
  return (
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
