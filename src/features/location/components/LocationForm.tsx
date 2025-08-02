'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { InsertLocation, InsertLocationType } from '@/db/schema';
import MapPinIcon from '@heroicons/react/24/solid/MapPinIcon';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon, NavigationIcon } from 'lucide-react';
import Link from 'next/link';
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
  const form = useForm<InsertLocationType>({
    defaultValues,
    resolver: zodResolver(InsertLocation),
    mode: 'onBlur',
  });

  const { control, handleSubmit, setValue, watch } = form;

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
    <Form {...form}>
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-6 p-4">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location Name *</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Tokyo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about this place..."
                  rows={5}
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-3">
          <Label className="text-sm font-medium">Current Coordinates</Label>
          <div className="bg-muted/50 border-border flex items-center gap-2 rounded-lg border p-3">
            <NavigationIcon size={16} className="text-primary" />
            <span className="font-mono text-sm">
              {formatNumber(watchedLat)}, {formatNumber(watchedLong)}
            </span>
          </div>
        </div>

        <Alert>
          <AlertTitle>Set Location Coordinates</AlertTitle>
          <AlertDescription>
            <ul className="list-inside list-disc text-sm">
              <li className="hidden lg:list-item">
                Drag the{' '}
                <MapPinIcon className="text-accent inline-flex size-4" /> marker
                to your desired location.
              </li>
              <li className="hidden lg:list-item">
                Double click on your desired location on the map.
              </li>
              <li>
                Search for a location using the &quot;location search&quot;
                below.
              </li>
            </ul>
          </AlertDescription>
        </Alert>

        <div className="flex flex-row justify-between gap-3 lg:justify-end">
          <Link href="/dashboard" className="w-1/2 lg:w-20" passHref>
            <Button
              type="button"
              variant="outline"
              className="border-border hover:bg-muted w-full bg-transparent"
              disabled={isFormSubmitting}
            >
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-primary-foreground w-1/2 lg:w-20"
            disabled={isFormSubmitting}
          >
            {isFormSubmitting ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              submitLabel
            )}
          </Button>
        </div>
      </form>

      <LocationSearch onResultSelected={handleResultSelected} />
    </Form>
  );
}
