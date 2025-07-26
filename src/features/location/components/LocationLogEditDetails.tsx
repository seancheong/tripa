'use client';

import type { InsertLocationLogType } from '@/db/schema/locationLog';
import { showToast } from '@/utils/showToast';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';

import type { getLocation } from '../actions/locationAction';
import {
  type getLocationLog,
  updateLocationLog,
} from '../actions/locationLogAction';
import { useLocation } from '../contexts/locationContext';
import { useLocationLog } from '../contexts/locationLogContext';
import LocationLogForm from './LocationLogForm';

interface LocationLogEditDetailsProps {
  locationData: ReturnType<typeof getLocation>;
  logData: ReturnType<typeof getLocationLog>;
}

export default function LocationLogEditDetails({
  locationData,
  logData,
}: LocationLogEditDetailsProps) {
  const location = use(locationData);
  const log = use(logData);
  const router = useRouter();

  const { setSelectedLocation } = useLocation();
  const { setSelectedLog } = useLocationLog();

  const [isFormSubmitting, setFormSubmitting] = useState(false);

  useEffect(() => {
    if (location) setSelectedLocation(location);
    if (log) setSelectedLog(log);

    return () => setSelectedLog(null);
  }, [location, log, setSelectedLocation, setSelectedLog]);

  if (!location || !log) {
    return <div className="text-error">Log not found</div>;
  }

  const submitHandler: SubmitHandler<InsertLocationLogType> = async (data) => {
    try {
      setFormSubmitting(true);
      await updateLocationLog(data, log.id);
      showToast({
        message: `Location Log "${log.name}" updated successfully.`,
      });
      router.push(`/dashboard/location/${location.slug}`);
    } catch (error) {
      setFormSubmitting(false);
      showToast({
        message: 'Failed to update location log',
        type: 'error',
        duration: 10000,
      });
    }
  };

  return (
    <LocationLogForm
      submitLabel="Update"
      isFormSubmitting={isFormSubmitting}
      defaultValues={{
        name: log.name,
        description: log.description,
        startedAt: log.startedAt,
        endedAt: log.endedAt,
        lat: location.lat,
        long: location.long,
      }}
      submitHandler={submitHandler}
    />
  );
}
