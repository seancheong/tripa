import { getLocation } from '@/features/location/actions/locationAction';
import LocationDetails from '@/features/location/components/LocationDetails';
import { Suspense } from 'react';

export default async function LocationSlugPage({
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
      <LocationDetails locationData={locationData} />
    </Suspense>
  );
}
