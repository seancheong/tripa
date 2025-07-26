'use client';

import { InsertLocationLogType } from '@/db/schema';
import { showToast } from '@/utils/showToast';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { getLocation } from '../actions/locationAction';
import { addLocationLog } from '../actions/locationLogAction';
import { useLocation } from '../contexts/locationContext';
import LocationLogForm from './LocationLogForm';

interface LocationAddLogDetailsProps {
  locationData: ReturnType<typeof getLocation>;
}

export default function LocationAddLogDetails({
  locationData,
}: LocationAddLogDetailsProps) {
  const location = use(locationData);
  const { setSelectedLocation } = useLocation();
  const router = useRouter();

  const [isFormSubmitting, setFormSubmitting] = useState(false);

  useEffect(() => {
    if (location) setSelectedLocation(location);
  }, [location, setSelectedLocation]);

  if (!location) return null;

  const submitHandler: SubmitHandler<InsertLocationLogType> = async (data) => {
    try {
      setFormSubmitting(true);
      await addLocationLog(data, location.slug);
      router.push(`/dashboard/location/${location.slug}`);
      showToast({
        message: 'New Location Log Added',
      });
    } catch (error) {
      setFormSubmitting(false);
      showToast({
        message: 'Failed to add location log',
        type: 'error',
        duration: 10000,
      });
    }
  };

  return (
    <LocationLogForm
      submitLabel="Add Location Log"
      isFormSubmitting={isFormSubmitting}
      defaultValues={{
        name: '',
        description: '',
        startedAt: Date.now() - 24 * 60 * 60 * 1000, // Default to 24 hours ago
        endedAt: Date.now(),
        lat: location.lat,
        long: location.long,
      }}
      submitHandler={submitHandler}
    />
  );
}
