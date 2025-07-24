import { getLocation } from '@/features/location/actions/locationAction';
import LocationEditForm from '@/features/location/components/LocationEditForm';
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
      <LocationEditForm locationData={locationData} />
    </Suspense>
  );
}
