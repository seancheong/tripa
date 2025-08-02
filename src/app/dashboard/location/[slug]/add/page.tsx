import { Button } from '@/components/ui/button';
import { getLocation } from '@/features/location/actions/locationAction';
import LocationAddLogDetails from '@/features/location/components/LocationAddLogDetails';
import { ArrowLeftIcon, Loader2Icon } from 'lucide-react';
import Link from 'next/link';
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
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" passHref>
          <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
            <ArrowLeftIcon size={16} />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">
            Add new log for {location.name}
          </h1>
          <p className="text-muted-foreground text-sm">
            Create a new log for your {location.name} travel journal
          </p>
        </div>
      </div>

      <Suspense fallback={<Loader2Icon className="animate-spin" />}>
        <LocationAddLogDetails locationData={locationData} />
      </Suspense>
    </div>
  );
}
