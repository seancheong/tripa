'use client';

import { MapPinPlusIcon } from 'lucide-react';
import Link from 'next/link';
import { use, useEffect } from 'react';

import { getLocation } from '../actions/locationAction';
import { useLocation } from '../contexts/locationContext';

interface LocationDetailsProps {
  locationData: ReturnType<typeof getLocation>;
}

export default function LocationDetails({
  locationData,
}: LocationDetailsProps) {
  const location = use(locationData);
  const { setSelectedLocation } = useLocation();

  useEffect(() => {
    if (location) setSelectedLocation(location);
  }, [location, setSelectedLocation]);

  if (!location) return <h2 className="text-error text-lg">Page not found</h2>;

  return (
    <>
      <h2 className="text-xl">Location page: {location.name}</h2>

      {location.description && (
        <p className="text-sm">{location.description}</p>
      )}

      {location.locationLogs.length === 0 && (
        <div className="mt-4">
          <p className="text-sm italic">Add a location log to get started </p>

          <Link
            href={`/dashboard/location/${location.slug}/add`}
            className="btn btn-primary mt-2"
          >
            Add location Log <MapPinPlusIcon size={16} />
          </Link>
        </div>
      )}
    </>
  );
}
