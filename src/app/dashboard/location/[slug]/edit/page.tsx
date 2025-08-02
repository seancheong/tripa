import { Button } from '@/components/ui/button';
import { getLocation } from '@/features/location/actions/locationAction';
import LocationEditDetails from '@/features/location/components/LocationEditDetails';
import { ArrowLeftIcon, Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function LocationEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locationData = getLocation(slug);

  return (
    <>
      <div className="flex items-center gap-4">
        <Link href="/dashboard" passHref>
          <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
            <ArrowLeftIcon size={16} />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Edit Location</h1>
        </div>
      </div>
      <Suspense fallback={<Loader2Icon className="animate-spin" />}>
        <LocationEditDetails locationData={locationData} />
      </Suspense>
    </>
  );
}
