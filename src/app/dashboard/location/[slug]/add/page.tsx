import { getLocation } from '@/features/location/actions/locationAction';
import LocationAddLogDetails from '@/features/location/components/LocationAddLogDetails';
import { Suspense } from 'react';

export default async function LocationAddPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locationData = getLocation(slug);
  const location = await locationData;

  if (!location) {
    return <div className="text-red-500">Location not found</div>;
  }

  return (
    <>
      <h2>Add new log for {location.name}</h2>

      <Suspense
        fallback={<span className="loading loading-spinner loading-xl" />}
      >
        <LocationAddLogDetails locationData={locationData} />
      </Suspense>
    </>
  );
}
