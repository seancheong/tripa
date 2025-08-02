import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getLocation } from '@/features/location/actions/locationAction';
import LocationDetails from '@/features/location/components/LocationDetails';
import LocationDropdownButton from '@/features/location/components/LocationDropdownButton';
import { ArrowLeftIcon, CalendarIcon, Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function LocationSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locationData = getLocation(slug);
  const location = await locationData;

  if (!location) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
            <ArrowLeftIcon size={16} />
          </Button>
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-foreground text-2xl leading-tight font-bold">
                {location.name}
              </h1>
              {location.description && (
                <p className="text-muted-foreground mt-1">
                  {location.description}
                </p>
              )}
            </div>
            <LocationDropdownButton
              href={location.slug}
              title={location.name}
            />
          </div>

          <div className="text-muted-foreground mt-3 flex items-center gap-1 text-sm">
            <CalendarIcon size={16} />
            <span>
              Added {new Date(location.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <Separator />

      <Suspense fallback={<Loader2Icon className="animate-spin" />}>
        <LocationDetails locationData={locationData} />
      </Suspense>
    </div>
  );
}
