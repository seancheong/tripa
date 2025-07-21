import { showToast } from '@/utils/showToast';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchIcon } from 'lucide-react';
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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LocationSearchFormData>({
    defaultValues: {
      q: '',
    },
    resolver: zodResolver(locationSearchSchema),
  });

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
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="join mt-4 w-full">
          <div className="w-full">
            <label className="input validator join-item">
              <SearchIcon size={16} />
              <input
                {...register('q')}
                type="text"
                placeholder="Location name, e.g. Tokyo"
                required
                className={errors.q ? 'input-error' : ''}
              />
            </label>
            <div className="validator-hint text-error">{errors.q?.message}</div>
          </div>
          <button disabled={isSubmitting} className="btn btn-neutral join-item">
            {isSubmitting ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              'Search'
            )}
          </button>
        </div>
      </form>

      <div className="flex flex-1 flex-col gap-2 overflow-auto">
        {hasSearched && locationResults.length === 0 ? (
          <p className="text-error">
            No results found, please search again with another location name
          </p>
        ) : (
          locationResults.map((result) => (
            <div key={result.place_id} className="card card-sm bg-base-100">
              <div className="card-body">
                <h4 className="card-title">{result.display_name}</h4>

                <div className="card-actions justify-end">
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => onResultSelected(result)}
                  >
                    Set Location
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
