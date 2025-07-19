'use client';

import {
  type AddLocationFormData,
  addLocation,
} from '@/actions/locationAction';
import { InsertLocation } from '@/db/schema';
import { showToast } from '@/utils/showToast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';

export default function LocationAddPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddLocationFormData>({
    defaultValues: { name: '', description: '', lat: 0, long: 0 },
    resolver: zodResolver(InsertLocation),
  });

  const submitHandler: SubmitHandler<AddLocationFormData> = async (data) => {
    try {
      await addLocation(data);
      showToast({ message: 'New location added' });
      router.push('/dashboard');
    } catch (error) {
      showToast({
        message: 'Failed to add location. Please try again.',
        type: 'error',
        duration: 10000,
      });
    }
  };

  return (
    <div className="container mx-auto mt-4 max-w-md">
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

        <FormField label="Latitude" error={errors.lat}>
          <input
            {...register('lat', { valueAsNumber: true })}
            type="number"
            step="any"
            className={`input w-full ${errors.lat && 'input-error'}`}
          />
        </FormField>

        <FormField label="Longitude" error={errors.long}>
          <input
            {...register('long', { valueAsNumber: true })}
            type="number"
            step="any"
            className={`input w-full ${errors.long && 'input-error'}`}
          />
        </FormField>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            disabled={isSubmitting}
            className="btn btn-outline min-w-20"
            onClick={() => router.back()}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary min-w-20"
          >
            {isSubmitting ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              'Add'
            )}
          </button>
        </div>
      </form>
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
