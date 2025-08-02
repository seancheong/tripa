import { getLocation } from '@/features/location/actions/locationAction';
import { getLocationLog } from '@/features/location/actions/locationLogAction';
import LocationLogEditDetails from '@/features/location/components/LocationLogEditDetails';
import { Loader2Icon } from 'lucide-react';
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
    <Suspense fallback={<Loader2Icon className="animate-spin" />}>
      <LocationLogEditDetails locationData={locationData} logData={logData} />
    </Suspense>
  );
}
