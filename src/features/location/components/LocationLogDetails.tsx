'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  formatDate,
  formatDateRange,
  formatDuration,
} from '@/utils/formatDate';
import { ArrowLeftIcon, CalendarIcon, ClockIcon } from 'lucide-react';
import Link from 'next/link';
import { use, useEffect } from 'react';

import type { getLocation } from '../actions/locationAction';
import { type getLocationLog } from '../actions/locationLogAction';
import { useLocation } from '../contexts/locationContext';
import { useLocationLog } from '../contexts/locationLogContext';
import LocationLogDropdownButton from './LocationLogDropdownButton';

interface LocationLogDetailsProps {
  locationData: ReturnType<typeof getLocation>;
  logData: ReturnType<typeof getLocationLog>;
}

export default function LocationLogDetails({
  locationData,
  logData,
}: LocationLogDetailsProps) {
  const location = use(locationData);
  const log = use(logData);
  const { setSelectedLocation } = useLocation();
  const { setSelectedLog } = useLocationLog();

  useEffect(() => {
    if (location) setSelectedLocation(location);
    if (log) setSelectedLog(log);

    return () => setSelectedLog(null);
  }, [location, log, setSelectedLocation, setSelectedLog]);

  if (!location || !log) {
    return <div className="text-error">Log not found</div>;
  }

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href={`/dashboard/location/${location.slug}`} passHref>
          <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
            <ArrowLeftIcon size={16} />
          </Button>
        </Link>

        <div className="flex min-w-0 flex-1 items-start justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-foreground text-3xl leading-tight font-bold">
              {log.name}
            </h1>
            <div className="mt-2 flex items-center gap-2">
              <Link
                href={`/dashboard/location/${location.slug}`}
                className="text-primary hover:text-primary/80 text-sm font-medium"
              >
                {location.name}
              </Link>
            </div>
          </div>
          <LocationLogDropdownButton
            id={log.id}
            locationSlug={location.slug}
            href={`/dashboard/location/${location.slug}/${log.id}`}
            title={log.name}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card className="bg-muted/30">
          <CardContent>
            <div className="flex items-center gap-2 text-sm">
              <CalendarIcon size={16} className="text-primary" />
              <div>
                <p className="font-medium">Visit Date</p>
                <p className="text-muted-foreground">
                  {formatDateRange(log.startedAt, log.endedAt)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/30">
          <CardContent>
            <div className="flex items-center gap-2 text-sm">
              <ClockIcon size={16} className="text-primary" />
              <div>
                <p className="font-medium">Duration</p>
                <p className="text-muted-foreground">
                  {formatDuration(log.startedAt, log.endedAt)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex-1 space-y-4">
        <h2 className="text-foreground text-xl font-semibold">Experience</h2>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          {log.description?.split('\n\n').map((paragraph, index) => (
            <p
              key={index}
              className="text-muted-foreground mb-4 leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <Card className="bg-muted/30">
        <CardContent>
          <div className="text-muted-foreground flex items-center justify-between text-xs">
            <span>Created: {formatDate(log.createdAt)}</span>
            <span>Updated: {formatDate(log.updatedAt)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
