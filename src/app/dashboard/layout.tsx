import MapView from '@/components/MapView';
import Sidebar from '@/components/Sidebar';
import { getLocations } from '@/features/location/actions/locationAction';
import LocationProviderWrapper from '@/features/location/components/LocationProviderWrapper';
import SidebarLocationList from '@/features/location/components/SidebarLocationList';
import { PropsWithChildren, Suspense } from 'react';

import Container from './Container';

export default async function DashboardLayout({ children }: PropsWithChildren) {
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

        <div className="bg-base-200 flex-1 overflow-auto">
          <Container>
            <div>{children}</div>

            <div className="flex-1 p-4">
              <Suspense>
                <MapView locationsData={locationsData} />
              </Suspense>
            </div>
          </Container>
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
