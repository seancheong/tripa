'use client';

import { PropsWithChildren } from 'react';

import { LocationProvider } from '../contexts/locationContext';
import { LocationLogProvider } from '../contexts/locationLogContext';

export default function LocationProviderWrapper({
  children,
}: PropsWithChildren) {
  return (
    <LocationProvider>
      <LocationLogProvider>{children}</LocationLogProvider>
    </LocationProvider>
  );
}
