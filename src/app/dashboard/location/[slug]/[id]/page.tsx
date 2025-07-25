import { getLocation } from '@/features/location/actions/locationAction';
import { getLocationLog } from '@/features/location/actions/locationLogAction';
import LocationLogDetails from '@/features/location/components/LocationLogDetails';
import { Suspense } from 'react';

export default async function LocationLogPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { id: logId, slug } = await params;
  const locationData = getLocation(slug);
  const logData = getLocationLog(parseInt(logId, 10));

  return (
    <Suspense
      fallback={<span className="loading loading-spinner loading-xl" />}
    >
      <LocationLogDetails locationData={locationData} logData={logData} />
    </Suspense>
  );
}
