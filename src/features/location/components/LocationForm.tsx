'use client';

import FormField from '@/components/FormField';
import { InsertLocation, InsertLocationType } from '@/db/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPinIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Location } from '../actions/locationAction';
import LocationSearch, { NominatimResult } from './LocationSearch';

interface LocationFormProps {
  submitLabel: string;
  isFormSubmitting: boolean;
  defaultValues: InsertLocationType;
  newCoordinates: Pick<Location, 'lat' | 'long'> | null;
  onResultSelected: (result: NominatimResult) => void;
  submitHandler: SubmitHandler<InsertLocationType>;
}

export default function LocationForm({
  submitLabel,
  isFormSubmitting,
  defaultValues,
  newCoordinates,
  onResultSelected,
  submitHandler,
}: LocationFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InsertLocationType>({
    defaultValues,
    resolver: zodResolver(InsertLocation),
    mode: 'onBlur',
  });

  const watchedLat = watch('lat');
  const watchedLong = watch('long');

  const formatNumber = (value: number, precision: number = 5) => {
    return value.toFixed(precision);
  };

  const handleResultSelected = (result: NominatimResult) => {
    onResultSelected(result);
    setValue('name', result.display_name);
    setValue('lat', parseFloat(result.lat));
    setValue('long', parseFloat(result.lon));
  };

  useEffect(() => {
    if (newCoordinates) {
      setValue('lat', newCoordinates.lat);
      setValue('long', newCoordinates.long);
    }
  }, [newCoordinates, setValue]);

  return (
    <>
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

        <p className="text-xs text-gray-400">{`Current coordinates: ${formatNumber(watchedLat)} ${formatNumber(watchedLong)}`}</p>
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
              submitLabel
            )}
          </button>
        </div>
      </form>

      <div className="divider" />

      <LocationSearch onResultSelected={handleResultSelected} />
    </>
  );
}
