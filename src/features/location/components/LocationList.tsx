'use client';

import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';

import { getLocations } from '../actions/locationAction';
import { useLocation } from '../contexts/locationContext';
import LocationCard from './LocationCard';

interface LocationListProps {
  locationsData: ReturnType<typeof getLocations>;
}

export default function LocationList({ locationsData }: LocationListProps) {
  const locations = use(locationsData);

  const { selectedLocation, highlightedLocation, setHighlightedLocation } =
    useLocation();

  return locations.length > 0 ? (
    <div className="grid grid-cols-1 gap-6 p-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {locations.map((location) => (
        <LocationCard
          key={location.id}
          href={`/dashboard/location/${location.slug}`}
          title={location.name}
          description={location.description}
          isHighlighted={
            selectedLocation?.id === location.id ||
            highlightedLocation?.id === location.id
          }
          onMouseEnter={() => setHighlightedLocation(location)}
          onMouseLeave={() => setHighlightedLocation(null)}
        />
      ))}
    </div>
  ) : (
    <div className="mt-4 flex flex-col gap-2">
      <h2 className="text-foreground text-xl font-semibold">
        Add a location to get started
      </h2>
      <Link href="/dashboard/add" passHref>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <PlusIcon size={16} />
          Add Location
        </Button>
      </Link>
    </div>
  );
}
