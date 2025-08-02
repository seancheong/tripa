'use client';

import SidebarButton from '@/components/SidebarButton';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar';
import { useSidebar } from '@/contexts/sidebarContext';
import MapPinIcon from '@heroicons/react/24/solid/MapPinIcon';
import { usePathname } from 'next/navigation';
import { use } from 'react';

import type { getLocations } from '../actions/locationAction';
import { useLocationLog } from '../contexts/locationLogContext';

interface SidebarLocationLogListProps {
  locationsData: ReturnType<typeof getLocations>;
}

export default function SidebarLocationLogList({
  locationsData,
}: SidebarLocationLogListProps) {
  const locations = use(locationsData);

  const pathname = usePathname();
  const slugMatch = pathname.match(/\/dashboard\/location\/([^\/]+)/);
  const slug = slugMatch?.[1] || null;
  const location = locations.find((location) => location.slug === slug);

  const { selectedLog, highlightedLog, setHighlightedLog } = useLocationLog();
  const { isSidebarOpen } = useSidebar();

  if (isSidebarOpen === null || !location || location.locationLogs.length === 0)
    return null;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Log List</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {location.locationLogs.map((log) => (
            <SidebarButton
              key={log.id}
              label={log.name}
              icon={
                <MapPinIcon
                  className={`size-5 ${selectedLog?.id === log.id || highlightedLog?.id === log.id ? 'text-accent' : ''}`}
                />
              }
              href={`/dashboard/location/${location.slug}/${log.id}`}
              onMouseEnter={() => setHighlightedLog(log)}
              onMouseLeave={() => setHighlightedLog(null)}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
