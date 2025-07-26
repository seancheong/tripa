'use client';

import { InsertLocationType } from '@/db/schema';
import { addLocation } from '@/features/location/actions/locationAction';
import LocationForm from '@/features/location/components/LocationForm';
import { NominatimResult } from '@/features/location/components/LocationSearch';
import { useLocation } from '@/features/location/contexts/locationContext';
import { KUALA_LUMPUR } from '@/utils/constants';
import { showToast } from '@/utils/showToast';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

export default function LocationAddPage() {
  const router = useRouter();
  const { newLocation, setNewLocation } = useLocation();
  const [isFormSubmitting, setFormSubmitting] = useState(false);

  const handleResultSelected = (result: NominatimResult) => {
    setNewLocation({
      lat: parseFloat(result.lat),
      long: parseFloat(result.lon),
    });
  };

  const submitHandler: SubmitHandler<InsertLocationType> = async (data) => {
    try {
      setFormSubmitting(true);
      await addLocation(data);
      showToast({ message: 'New location added' });
      router.push('/dashboard');
    } catch (error) {
      setFormSubmitting(false);
      showToast({
        message: 'Failed to add location. Please try again.',
        type: 'error',
        duration: 10000,
      });
    }
  };

  useEffect(() => {
    setNewLocation({
      lat: KUALA_LUMPUR.lat,
      long: KUALA_LUMPUR.long,
    });

    return () => setNewLocation(null);
  }, [setNewLocation]);

  return (
    <div className="container mx-auto mt-4 max-w-md p-4">
      <div className="my-4">
        <h1 className="text-lg">Add Location</h1>

        <p className="text-sm">
          A location is a place you have traveled or will travel to. It can be a
          city, country, state or point of interest. You can add specific times
          you visited this location after adding it.
        </p>
      </div>

      <LocationForm
        submitLabel="Add"
        isFormSubmitting={isFormSubmitting}
        defaultValues={{
          name: '',
          description: '',
          lat: KUALA_LUMPUR.lat,
          long: KUALA_LUMPUR.long,
        }}
        newCoordinates={newLocation}
        onResultSelected={handleResultSelected}
        submitHandler={submitHandler}
      />
    </div>
  );
}
