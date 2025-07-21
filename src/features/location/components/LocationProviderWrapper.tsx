'use client';

import { PropsWithChildren } from 'react';

import { LocationProvider } from '../contexts/locationContext';

export default function LocationProviderWrapper({
  children,
}: PropsWithChildren) {
  return <LocationProvider>{children}</LocationProvider>;
}
