'use client';

import { getLocations } from '@/features/location/actions/locationAction';
import { KUALA_LUMPUR } from '@/utils/constants';
import MapPinIcon from '@heroicons/react/24/solid/MapPinIcon';
import {
  Map as MapLibre,
  Marker,
  NavigationControl,
  useMap,
} from '@vis.gl/react-maplibre';
import maplibregl, { LngLatBounds } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useTheme } from 'next-themes';
import { use, useEffect } from 'react';

interface MapViewProps {
  locationsData: ReturnType<typeof getLocations>;
}

export default function MapView({ locationsData }: MapViewProps) {
  const locations = use(locationsData);
  const { resolvedTheme } = useTheme();

  return (
    <MapLibre
      mapLib={maplibregl}
      initialViewState={{
        latitude: KUALA_LUMPUR.lat,
        longitude: KUALA_LUMPUR.long,
        zoom: 5,
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle={
        resolvedTheme === 'dark'
          ? '/styles/dark.json'
          : 'https://tiles.openfreemap.org/styles/liberty'
      }
    >
      <NavigationControl />
      <AutoFitBounds locations={locations} />
      {locations.map((location) => (
        <Marker
          key={location.id}
          latitude={location.lat}
          longitude={location.long}
        >
          <div className="tooltip tooltip-top" data-tip={location.name}>
            <MapPinIcon className="text-primary size-10" />
          </div>
        </Marker>
      ))}
    </MapLibre>
  );
}

interface AutoFitBoundsProps {
  locations: Awaited<ReturnType<typeof getLocations>>;
}

function AutoFitBounds({ locations }: AutoFitBoundsProps) {
  const map = useMap();

  useEffect(() => {
    if (!map.current || locations.length === 0) return;

    const firstPoint = locations[0];
    const bounds = locations.reduce(
      (bounds, point) => bounds.extend([point.long, point.lat]),
      new LngLatBounds(
        [firstPoint.long, firstPoint.lat],
        [firstPoint.long, firstPoint.lat],
      ),
    );

    map.current.fitBounds(bounds, {
      padding: 60,
      maxZoom: 14,
      duration: 1000,
    });
  }, [map, locations]);

  return null;
}
