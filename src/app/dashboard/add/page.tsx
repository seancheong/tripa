'use client';

import { Button } from '@/components/ui/button';
import { InsertLocationType } from '@/db/schema';
import { addLocation } from '@/features/location/actions/locationAction';
import LocationForm from '@/features/location/components/LocationForm';
import { NominatimResult } from '@/features/location/components/LocationSearch';
import { useLocation } from '@/features/location/contexts/locationContext';
import { KUALA_LUMPUR } from '@/utils/constants';
import { showToast } from '@/utils/showToast';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
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
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" passHref>
          <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
            <ArrowLeftIcon size={16} />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Add Location</h1>
          <p className="text-muted-foreground text-sm">
            Create a new destination for your travel journal
          </p>
        </div>
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
