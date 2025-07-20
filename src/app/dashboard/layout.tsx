import MapView from '@/components/MapView';
import Sidebar from '@/components/Sidebar';
import SidebarLocationList from '@/components/SidebarLocationList';
import { getLocations } from '@/features/location/actions/locationAction';
import { PropsWithChildren, Suspense } from 'react';

export default function DashboardLayout({ children }: PropsWithChildren) {
  const locationsData = getLocations();

  return (
    <div className="flex flex-1">
      <Sidebar
        locationList={
          <Suspense fallback={<LocationListSkeleton />}>
            <SidebarLocationList locationsData={locationsData} />
          </Suspense>
        }
      />

      <div className="flex flex-1 flex-col">
        <div>{children}</div>

        <div className="flex-1 p-4">
          <MapView />
        </div>
      </div>
    </div>
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
