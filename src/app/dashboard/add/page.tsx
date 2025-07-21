'use client';

import { InsertLocation } from '@/db/schema';
import {
  type AddLocationFormData,
  addLocation,
} from '@/features/location/actions/locationAction';
import LocationSearch, {
  NominatimResult,
} from '@/features/location/components/LocationSearch';
import { useLocation } from '@/features/location/contexts/locationContext';
import { KUALA_LUMPUR } from '@/utils/constants';
import { showToast } from '@/utils/showToast';
import MapPinIcon from '@heroicons/react/24/solid/MapPinIcon';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect, useState } from 'react';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';

export default function LocationAddPage() {
  const router = useRouter();
  const { newLocation, setNewLocation } = useLocation();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<AddLocationFormData>({
    defaultValues: {
      name: '',
      description: '',
      lat: KUALA_LUMPUR.lat,
      long: KUALA_LUMPUR.long,
    },
    resolver: zodResolver(InsertLocation),
  });

  const [isFormSubmitting, setFormSubmitting] = useState(false);

  const submitHandler: SubmitHandler<AddLocationFormData> = async (data) => {
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

  const formatNumber = (value: number) => {
    return value.toFixed(5);
  };

  const handleResultSelected = (result: NominatimResult) => {
    setNewLocation({
      lat: parseInt(result.lat, 10),
      long: parseInt(result.lon, 10),
    });
    setValue('name', result.display_name);
  };

  useEffect(() => {
    setNewLocation({
      lat: KUALA_LUMPUR.lat,
      long: KUALA_LUMPUR.long,
    });

    return () => setNewLocation(null);
  }, [setNewLocation]);

  useEffect(() => {
    if (newLocation) {
      setValue('lat', newLocation.lat);
      setValue('long', newLocation.long);
    }
  }, [newLocation, setValue]);

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

      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(submitHandler)}
      >
        <FormField label="Name" error={errors.name}>
          <input
            {...register('name')}
            className={`input w-full ${errors.name && 'input-error'}`}
          />
        </FormField>

        <FormField label="Description" error={errors.description}>
          <textarea
            {...register('description')}
            rows={5}
            className={`textarea w-full ${errors.description && 'textarea-error'}`}
          />
        </FormField>

        <p className="text-xs text-gray-400">{`Current coordinates: ${formatNumber(getValues('lat'))} ${formatNumber(getValues('long'))}`}</p>
        <p>To set the coordinates:</p>
        <ul className="ml-4 list-disc text-sm">
          <li>
            Drag the <MapPinIcon className="text-info inline-flex size-4" />{' '}
            marker to your desired location.
          </li>
          <li>Double click on your desired location on the map.</li>
          <li>Search for a location below.</li>
        </ul>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            disabled={isFormSubmitting}
            className="btn btn-outline min-w-20"
            onClick={() => router.back()}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isFormSubmitting}
            className="btn btn-primary min-w-20"
          >
            {isFormSubmitting ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              'Add'
            )}
          </button>
        </div>
      </form>

      <div className="divider" />

      <LocationSearch onResultSelected={handleResultSelected} />
    </div>
  );
}

interface FormFieldProps {
  label: string;
  error?: FieldError;
}

function FormField({
  children,
  label,
  error,
}: PropsWithChildren<FormFieldProps>) {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{label}</legend>
      {children}
      {error && <p className="label text-error">{error.message}</p>}
    </fieldset>
  );
}
