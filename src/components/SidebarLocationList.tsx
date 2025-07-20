'use client';

import { useSidebar } from '@/contexts/sidebarContext';
import { getLocations } from '@/features/location/actions/locationAction';
import { MapPinIcon } from 'lucide-react';
import { use } from 'react';

import SidebarButton from './SidebarButton';

interface SidebarLocationListProps {
  locationsData: ReturnType<typeof getLocations>;
}

export default function SidebarLocationList({
  locationsData,
}: SidebarLocationListProps) {
  const locations = use(locationsData);

  const { isSidebarOpen } = useSidebar();

  if (isSidebarOpen === null || locations.length === 0) return null;

  return (
    <>
      <div className="divider" />
      {locations.map(({ id, name }) => (
        <SidebarButton
          key={id}
          label={name}
          icon={<MapPinIcon size={16} />}
          href="#"
          showLabel={isSidebarOpen}
        />
      ))}
    </>
  );
}
