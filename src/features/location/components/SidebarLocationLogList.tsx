'use client';

import SidebarButton from '@/components/SidebarButton';
import { useSidebar } from '@/contexts/sidebarContext';
import { MapPinIcon } from 'lucide-react';
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
  const segments = pathname.split('/');
  const slug = segments.length >= 4 ? segments[3] : null;
  const location = locations.find((location) => location.slug === slug);

  const { selectedLog, setSelectedLog } = useLocationLog();
  const { isSidebarOpen } = useSidebar();

  if (isSidebarOpen === null || !location || location.locationLogs.length === 0)
    return null;

  return (
    <>
      <div className="divider" />
      {location.locationLogs.map((log) => (
        <SidebarButton
          key={log.id}
          label={log.name}
          icon={
            <MapPinIcon
              className={`size-5 ${selectedLog?.id === log.id ? 'text-accent' : ''}`}
            />
          }
          href={`/dashboard/location/${location.slug}/${log.id}`}
          showLabel={isSidebarOpen}
          onMouseEnter={() => setSelectedLog(log)}
          onMouseLeave={() => setSelectedLog(null)}
        />
      ))}
    </>
  );
}
