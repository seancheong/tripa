'use client';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar';
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
  const { selectedLocation, highlightedLocation, setHighlightedLocation } =
    useLocation();

  if (isSidebarOpen === null || locations.length === 0) return null;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Location List</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {locations.map((location) => (
            <SidebarButton
              key={location.id}
              label={location.name}
              icon={
                <MapPinIcon
                  className={`size-5 ${selectedLocation?.id === location.id || highlightedLocation?.id === location.id ? 'text-primary' : ''}`}
                />
              }
              href={`/dashboard/location/${location.slug}`}
              onMouseEnter={() => setHighlightedLocation(location)}
              onMouseLeave={() => setHighlightedLocation(null)}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
