'use client';

import { useSidebar } from '@/contexts/sidebarContext';
import { getLocations } from '@/features/location/actions/locationAction';
import MapPinIcon from '@heroicons/react/24/solid/MapPinIcon';
import { use } from 'react';

import SidebarButton from '../../../components/SidebarButton';
import { useLocation } from '../contexts/locationContext';

interface SidebarLocationListProps {
  locationsData: ReturnType<typeof getLocations>;
}

export default function SidebarLocationList({
  locationsData,
}: SidebarLocationListProps) {
  const locations = use(locationsData);

  const { isSidebarOpen } = useSidebar();
  const { selectedLocation, setSelectedLocation } = useLocation();

  if (isSidebarOpen === null || locations.length === 0) return null;

  return (
    <>
      <div className="divider" />
      {locations.map((location) => (
        <SidebarButton
          key={location.id}
          label={location.name}
          icon={
            <MapPinIcon
              className={`size-5 ${selectedLocation?.id === location.id ? 'text-accent' : ''}`}
            />
          }
          href="#"
          showLabel={isSidebarOpen}
          onMouseEnter={() => setSelectedLocation(location, true)}
          onMouseLeave={() => setSelectedLocation(null)}
        />
      ))}
    </>
  );
}
