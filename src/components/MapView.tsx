'use client';

import {
  type Location,
  type NewLocation,
  getLocations,
} from '@/features/location/actions/locationAction';
import { useLocation } from '@/features/location/contexts/locationContext';
import useWatch from '@/hooks/useWatch';
import { KUALA_LUMPUR } from '@/utils/constants';
import MapPinIcon from '@heroicons/react/24/solid/MapPinIcon';
import {
  Map as MapLibre,
  Marker,
  type MarkerDragEvent,
  NavigationControl,
  Popup,
  useMap,
} from '@vis.gl/react-maplibre';
import maplibregl, { LngLatBounds, MapLayerMouseEvent } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useTheme } from 'next-themes';
import { use, useEffect, useRef, useState } from 'react';

interface MapViewProps {
  locationsData: ReturnType<typeof getLocations>;
}

export default function MapView({ locationsData }: MapViewProps) {
  const locations = use(locationsData);
  const { resolvedTheme } = useTheme();

  const {
    selectedLocation,
    newLocation,
    shouldFly,
    setSelectedLocation,
    setNewLocation,
  } = useLocation();

  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);

  const handleDragEnd = (event: MarkerDragEvent) => {
    if (newLocation) {
      setNewLocation({ lat: event.lngLat.lat, long: event.lngLat.lng });
    }
  };

  const handleDoubleClick = (event: MapLayerMouseEvent) => {
    if (newLocation) {
      setNewLocation({ lat: event.lngLat.lat, long: event.lngLat.lng });
    }
  };

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
      onDblClick={handleDoubleClick}
    >
      <NavigationControl />
      <AutoFitBoundsAndZoom
        shouldFly={shouldFly}
        locations={locations}
        selectedLocation={selectedLocation}
        newLocation={newLocation}
      />

      {/* Marker show up when adding new location */}
      {newLocation && (
        <Marker
          latitude={newLocation.lat}
          longitude={newLocation.long}
          draggable
          onDragEnd={handleDragEnd}
        >
          <div
            className="tooltip tooltip-top hover:cursor-pointer"
            data-tip="Drag to your desired location"
          >
            <MapPinIcon className="text-info size-12" />
          </div>
        </Marker>
      )}

      {/* Markers for already added locations */}
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
  newLocation: NewLocation | null;
}

function AutoFitBoundsAndZoom({
  shouldFly,
  locations,
  selectedLocation,
  newLocation,
}: AutoFitBoundsProps) {
  const map = useMap();
  const boundsRef = useRef<LngLatBounds | null>(null);

  useWatch(newLocation, (newValue, oldValue) => {
    if (newValue && !oldValue) {
      map.current?.flyTo({
        center: [newValue.long, newValue.lat],
        speed: 0.8,
        zoom: 6,
      });
    }
  });

  // Effect to create a resonable bounds that able to show all saved locations
  useEffect(() => {
    if (!map.current || locations.length === 0 || newLocation) return;

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
  }, [map, locations, newLocation]);

  // Effect to zoom into a location in map, whenever a location is selected
  // else just zoom out to show all locations
  useEffect(() => {
    if (!map.current || newLocation) return;

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
  }, [map, shouldFly, selectedLocation, newLocation]);

  return null;
}
