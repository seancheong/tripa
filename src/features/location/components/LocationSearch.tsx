import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { showToast } from '@/utils/showToast';
import MapPinIcon from '@heroicons/react/24/solid/MapPinIcon';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

export type NominatimResult = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: string[];
};

const locationSearchSchema = z.object({
  q: z.string().min(1),
});

type LocationSearchFormData = z.infer<typeof locationSearchSchema>;

interface LocationSearchProps {
  onResultSelected: (result: NominatimResult) => void;
}

export default function LocationSearch({
  onResultSelected,
}: LocationSearchProps) {
  const [hasSearched, setHasSearched] = useState(false);
  const [locationResults, setLocationResults] = useState<NominatimResult[]>([]);

  const form = useForm<LocationSearchFormData>({
    defaultValues: {
      q: '',
    },
    resolver: zodResolver(locationSearchSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const submitHandler: SubmitHandler<LocationSearchFormData> = async (data) => {
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(data.q)}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch location data');
      }

      const results = (await response.json()) as NominatimResult[];
      setLocationResults(results);
      setHasSearched(true);
    } catch (error) {
      console.error('Error fetching location', error);
      showToast({
        message: 'Failed to search location result. Please try again.',
        type: 'error',
        duration: 10000,
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <Form {...form}>
        <form onSubmit={handleSubmit(submitHandler)} className="flex gap-2">
          <FormField
            control={control}
            name="q"
            render={({ field }) => (
              <FormItem className="relative flex-1">
                <FormControl>
                  <Input placeholder="Location Search, e.g. Tokyo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isSubmitting}
            className="bg-secondary hover:bg-secondary/80 text-secondary-foreground min-w-22"
          >
            {isSubmitting ? <Loader2Icon className="animate-spin" /> : 'Search'}
          </Button>
        </form>

        {hasSearched ? (
          <Card className="bg-background border-border top-full max-h-64 overflow-auto shadow-xl">
            <CardContent className="p-0">
              {isSubmitting ? (
                <div className="p-4 text-center">
                  <Loader2Icon className="text-accent mx-auto mb-2 h-5 w-5 animate-spin" />
                  <p className="text-muted-foreground text-sm">
                    Searching locations...
                  </p>
                </div>
              ) : locationResults.length > 0 ? (
                <div className="divide-border divide-y">
                  {locationResults.map((result) => (
                    <button
                      key={result.place_id}
                      onClick={() => onResultSelected(result)}
                      className="hover:bg-muted/50 flex w-full items-start gap-3 p-4 text-left transition-colors duration-200 hover:cursor-pointer"
                    >
                      <MapPinIcon className="text-accent mt-0.5 h-4 w-4 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-foreground text-sm font-medium">
                          {result.display_name}
                        </p>
                        <p className="text-muted-foreground mt-1 text-xs">
                          {result.lat}, {result.lon}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center">
                  <p className="text-muted-foreground text-sm">
                    No results found, please search again with another location
                    name
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ) : null}
      </Form>
    </div>
  );
}
