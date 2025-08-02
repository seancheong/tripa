'use client';

import { Button } from '@/components/ui/button';
import { formatDateRange } from '@/utils/formatDate';
import { ClockIcon, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { use, useEffect } from 'react';

import { getLocation } from '../actions/locationAction';
import { useLocation } from '../contexts/locationContext';
import { useLocationLog } from '../contexts/locationLogContext';
import LocationLogCard from './LocationLogCard';

interface LocationDetailsProps {
  locationData: ReturnType<typeof getLocation>;
}

export default function LocationDetails({
  locationData,
}: LocationDetailsProps) {
  const location = use(locationData);
  const { setSelectedLocation } = useLocation();
  const { selectedLog, setSelectedLog } = useLocationLog();

  useEffect(() => {
    if (location) setSelectedLocation(location);
  }, [location, setSelectedLocation]);

  if (!location)
    return <h2 className="text-error text-lg">Location not found</h2>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground text-xl font-semibold">Travel Logs</h2>
          <p className="text-muted-foreground text-sm">
            Your experiences at this location
          </p>
        </div>
        <Link href={`/dashboard/location/${location.slug}/add`}>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <PlusIcon size={16} />
            Add Log
          </Button>
        </Link>
      </div>

      {location.locationLogs.length > 0 && (
        <div className="grid grid-cols-1 gap-6 p-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {location.locationLogs.map((log) => (
            <LocationLogCard
              key={log.id}
              logid={log.id}
              locationslug={location.slug}
              href={`/dashboard/location/${location.slug}/${log.id}`}
              title={log.name}
              description={log.description}
              isHighlighted={selectedLog?.id === log.id}
              onMouseEnter={() => setSelectedLog(log)}
              onMouseLeave={() => setSelectedLog(null)}
            >
              <div className="text-muted-foreground flex items-center gap-1 text-xs">
                <ClockIcon size={12} />
                <span>{formatDateRange(log.startedAt, log.endedAt)}</span>
              </div>
            </LocationLogCard>
          ))}
        </div>
      )}
    </div>
  );
}
