'use client';

import { showToast } from '@/utils/showToast';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import {
  AddLocationFormData,
  getLocation,
  updateLocation,
} from '../actions/locationAction';
import { useLocation } from '../contexts/locationContext';
import LocationForm from './LocationForm';
import { NominatimResult } from './LocationSearch';

interface LocationEditFormProps {
  locationData: ReturnType<typeof getLocation>;
}

export default function LocationEditForm({
  locationData,
}: LocationEditFormProps) {
  const location = use(locationData);

  const router = useRouter();
  const { editedLocation, setEditedLocation, setSelectedLocation } =
    useLocation();
  const [isFormSubmitting, setFormSubmitting] = useState(false);

  useEffect(() => {
    if (location) {
      setSelectedLocation(location);
      setEditedLocation(location);
    }

    return () => setEditedLocation(null);
  }, [location, setSelectedLocation, setEditedLocation]);

  if (!location) return null;

  const handleResultSelected = (result: NominatimResult) => {
    setEditedLocation({
      ...location,
      lat: parseFloat(result.lat),
      long: parseFloat(result.lon),
    });
  };

  const submitHandler: SubmitHandler<AddLocationFormData> = async (data) => {
    try {
      setFormSubmitting(true);
      await updateLocation(location.slug, data);
      showToast({ message: `${location.name} location edited` });
      router.push(`/dashboard/location/${location.slug}`);
    } catch (error) {
      setFormSubmitting(false);
      showToast({
        message: `Failed to edit ${location.slug}. Please try again.`,
        type: 'error',
        duration: 10000,
      });
    }
  };

  return (
    <LocationForm
      submitLabel="Update"
      isFormSubmitting={isFormSubmitting}
      defaultValues={{
        name: location.name,
        description: location.description,
        lat: location.lat,
        long: location.long,
      }}
      newCoordinates={editedLocation}
      onResultSelected={handleResultSelected}
      submitHandler={submitHandler}
    />
  );
}
