import { Button } from '@/components/ui/button';
import { getLocations } from '@/features/location/actions/locationAction';
import LocationList from '@/features/location/components/LocationList';
import { Loader2Icon, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

export default function DashboardPage() {
  const locationsData = getLocations();

  return (
    <>
      <div className="flex flex-col items-start justify-between gap-4 px-2 py-4 sm:flex-row sm:items-start">
        <div>
          <h1 className="text-foreground text-2xl font-bold lg:text-3xl">
            Your Locations
          </h1>

          <p className="text-muted-foreground mt-1 text-sm lg:text-base">
            Manage and explore your travel destinations
          </p>
        </div>

        <Link href="/dashboard/add">
          <Button className="bg-primary hover:bg-primary/90 text-sm font-semibold lg:px-4 lg:text-base">
            <PlusIcon size={16} />
            <span>Add Location</span>
          </Button>
        </Link>
      </div>

      <Suspense fallback={<Loader2Icon className="animate-spin" />}>
        <LocationList locationsData={locationsData} />
      </Suspense>
    </>
  );
}
