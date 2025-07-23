'use client';

import { CirclePlusIcon } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';

import { getLocations } from '../actions/locationAction';
import { useLocation } from '../contexts/locationContext';

interface LocationListProps {
  locationsData: ReturnType<typeof getLocations>;
}

export default function LocationList({ locationsData }: LocationListProps) {
  const locations = use(locationsData);

  const { selectedLocation, highlightedLocation, setHighlightedLocation } =
    useLocation();

  return locations.length > 0 ? (
    <div className="mt-4 flex flex-nowrap gap-2 overflow-x-auto overflow-y-hidden">
      {locations.map((location) => (
        <Link
          key={location.id}
          href={`/dashboard/location/${location.slug}`}
          className={`card card-compact bg-base-300 mb-2 h-28 w-72 shrink-0 border-2 hover:cursor-pointer ${selectedLocation?.id === location.id || highlightedLocation?.id === location.id ? 'border-accent' : 'border-transparent'}`}
          onMouseEnter={() => setHighlightedLocation(location)}
          onMouseLeave={() => setHighlightedLocation(null)}
        >
          <div className="card-body">
            <h3>{location.name}</h3>
            <p>{location.description}</p>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <div className="mt-4 flex flex-col gap-2">
      <p>Add a location to get started</p>
      <Link href="/dashboard/add" className="btn btn-primary w-40">
        Add Location <CirclePlusIcon size={16} />
      </Link>
    </div>
  );
}
