import { getLocation } from '@/features/location/actions/locationAction';
import { getLocationLog } from '@/features/location/actions/locationLogAction';
import LocationLogEditDetails from '@/features/location/components/LocationLogEditDetails';
import { Suspense } from 'react';

export default async function LocationLogEditPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id: logId } = await params;
  const locationData = getLocation(slug);
  const logData = getLocationLog(parseInt(logId, 10));

  return (
    <Suspense
      fallback={<span className="loading loading-spinner loading-xl" />}
    >
      <LocationLogEditDetails locationData={locationData} logData={logData} />
    </Suspense>
  );
}
