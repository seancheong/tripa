'use client';

import { KUALA_LUMPUR } from '@/utils/constants';
import { Map as MapLibre } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useTheme } from 'next-themes';

export default function Map() {
  const { resolvedTheme } = useTheme();

  return (
    <MapLibre
      initialViewState={{
        latitude: KUALA_LUMPUR.latitude,
        longitude: KUALA_LUMPUR.longitude,
        zoom: 5,
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle={
        resolvedTheme === 'dark'
          ? '/styles/dark.json'
          : 'https://tiles.openfreemap.org/styles/liberty'
      }
    />
  );
}
