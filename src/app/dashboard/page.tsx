import LocationList from '@/features/components/LocationList';
import { getLocations } from '@/features/location/actions/locationAction';
import { Suspense } from 'react';

export default function DashboardPage() {
  const locationsData = getLocations();

  return (
    <div className="p-4">
      <h2 className="text-2xl">Locations</h2>

      <Suspense
        fallback={<span className="loading loading-spinner loading-xl" />}
      >
        <LocationList locationsData={locationsData} />
      </Suspense>
    </div>
  );
}
