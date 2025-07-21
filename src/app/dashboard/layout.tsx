import MapView from '@/components/MapView';
import Sidebar from '@/components/Sidebar';
import { getLocations } from '@/features/location/actions/locationAction';
import LocationProviderWrapper from '@/features/location/components/LocationProviderWrapper';
import SidebarLocationList from '@/features/location/components/SidebarLocationList';
import { PropsWithChildren, Suspense } from 'react';

export default function DashboardLayout({ children }: PropsWithChildren) {
  const locationsData = getLocations();

  return (
    <LocationProviderWrapper>
      <div className="flex flex-1">
        <Sidebar
          locationList={
            <Suspense fallback={<LocationListSkeleton />}>
              <SidebarLocationList locationsData={locationsData} />
            </Suspense>
          }
        />

        <div className="flex-1 overflow-auto">
          <div className="flex size-full flex-col">
            <div>{children}</div>

            <div className="flex-1 p-4">
              <Suspense>
                <MapView locationsData={locationsData} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </LocationProviderWrapper>
  );
}

function LocationListSkeleton() {
  return (
    <>
      <div className="divider" />
      <div className="px-4">
        <div className="skeleton h-4 w-full" />
      </div>
    </>
  );
}
