'use client';

import {
  Location,
  getLocations,
} from '@/features/location/actions/locationAction';
import { useLocation } from '@/features/location/contexts/locationContext';
import { KUALA_LUMPUR } from '@/utils/constants';
import MapPinIcon from '@heroicons/react/24/solid/MapPinIcon';
import {
  Map as MapLibre,
  Marker,
  NavigationControl,
  Popup,
  useMap,
} from '@vis.gl/react-maplibre';
import maplibregl, { LngLatBounds } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useTheme } from 'next-themes';
import { use, useEffect, useRef, useState } from 'react';

interface MapViewProps {
  locationsData: ReturnType<typeof getLocations>;
}

export default function MapView({ locationsData }: MapViewProps) {
  const locations = use(locationsData);
  const { resolvedTheme } = useTheme();

  const { selectedLocation, shouldFly, setSelectedLocation } = useLocation();

  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);

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
      <AutoFitBoundsAndZoom
        shouldFly={shouldFly}
        locations={locations}
        selectedLocation={selectedLocation}
      />
      {locations.map((location) => {
        const { id, name, description, lat, long } = location;

        return (
          <div key={id}>
            <Marker latitude={lat} longitude={long}>
              <div
                className={`tooltip tooltip-top hover:cursor-pointer ${selectedLocation?.id === id ? 'tooltip-open' : ''}`}
                data-tip={name}
                onClick={() => setSelectedMarker(id)}
                onMouseEnter={() => setSelectedLocation(location)}
                onMouseLeave={() => setSelectedLocation(null)}
              >
                <MapPinIcon
                  className={`size-10 ${selectedLocation?.id === id ? 'text-accent' : 'text-secondary'}`}
                />
              </div>
            </Marker>

            {selectedMarker === id && (
              <Popup
                latitude={lat}
                longitude={long}
                closeOnClick={false}
                onClose={() => setSelectedMarker(null)}
              >
                <h3 className="text-xl">{name}</h3>
                {description && <p>{description}</p>}
              </Popup>
            )}
          </div>
        );
      })}
    </MapLibre>
  );
}

interface AutoFitBoundsProps {
  shouldFly: boolean;
  locations: Location[];
  selectedLocation: Location | null;
}

function AutoFitBoundsAndZoom({
  shouldFly,
  locations,
  selectedLocation,
}: AutoFitBoundsProps) {
  const map = useMap();
  const boundsRef = useRef<LngLatBounds | null>(null);

  useEffect(() => {
    if (!map.current || locations.length === 0) return;

    const firstPoint = locations[0];
    boundsRef.current = locations.reduce(
      (bounds, point) => bounds.extend([point.long, point.lat]),
      new LngLatBounds(
        [firstPoint.long, firstPoint.lat],
        [firstPoint.long, firstPoint.lat],
      ),
    );

    map.current.fitBounds(boundsRef.current, {
      padding: 60,
      maxZoom: 14,
      duration: 1000,
    });
  }, [map, locations]);

  useEffect(() => {
    if (!map.current) return;

    if (selectedLocation) {
      if (shouldFly) {
        map.current?.flyTo({
          center: [selectedLocation.long, selectedLocation.lat],
          speed: 0.8,
        });
      }
    } else if (boundsRef.current) {
      map.current.fitBounds(boundsRef.current, {
        padding: 60,
        maxZoom: 14,
        duration: 1000,
      });
    }
  }, [map, shouldFly, selectedLocation]);

  return null;
}
