import AppSidebar from '@/components/AppSidebar';
import CustomSidebarTrigger from '@/components/CustomSidebarTrigger';
import MapView from '@/components/MapView';
import { SidebarProvider } from '@/components/ui/sidebar';
import { getLocations } from '@/features/location/actions/locationAction';
import LocationProviderWrapper from '@/features/location/components/LocationProviderWrapper';
import SidebarLocationList from '@/features/location/components/SidebarLocationList';
import SidebarLocationLogList from '@/features/location/components/SidebarLocationLogList';
import { PropsWithChildren, Suspense } from 'react';

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const locationsData = getLocations();

  return (
    <SidebarProvider className="h-[calc(100dvh-80px)] min-h-[calc(100dvh-80px)]">
      <LocationProviderWrapper>
        <div className="border-border flex flex-1 border-t-2">
          <AppSidebar
            locationList={
              <Suspense fallback={<LocationListSkeleton />}>
                <SidebarLocationList locationsData={locationsData} />
              </Suspense>
            }
            logList={
              <Suspense fallback={<LocationListSkeleton />}>
                <SidebarLocationLogList locationsData={locationsData} />
              </Suspense>
            }
          />

          <div className="flex flex-1 flex-col overflow-y-auto p-4">
            <CustomSidebarTrigger />

            <div className="relative flex flex-1 flex-col gap-4">
              <div className="h-full overflow-y-auto lg:h-1/2">{children}</div>

              <div className="hidden rounded lg:block lg:h-1/2">
                <div className="h-full w-full overflow-hidden rounded">
                  <Suspense>
                    <MapView locationsData={locationsData} />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LocationProviderWrapper>
    </SidebarProvider>
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
