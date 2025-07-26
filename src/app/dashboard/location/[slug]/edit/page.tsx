import { getLocation } from '@/features/location/actions/locationAction';
import LocationEditDetails from '@/features/location/components/LocationEditDetails';
import { Suspense } from 'react';

export default async function LocationEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locationData = getLocation(slug);

  return (
    <Suspense
      fallback={<span className="loading loading-spinner loading-xl" />}
    >
      <LocationEditDetails locationData={locationData} />
    </Suspense>
  );
}
