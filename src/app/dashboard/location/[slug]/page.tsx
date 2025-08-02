import { getLocation } from '@/features/location/actions/locationAction';
import LocationDetails from '@/features/location/components/LocationDetails';
import { Loader2Icon } from 'lucide-react';
import { Suspense } from 'react';

export default async function LocationSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locationData = getLocation(slug);

  return (
    <Suspense fallback={<Loader2Icon className="animate-spin" />}>
      <LocationDetails locationData={locationData} />
    </Suspense>
  );
}
