import { usePathname } from 'next/navigation';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import type { Location, NewLocation } from '../actions/locationAction';

interface LocationContextType {
  highlightedLocation: Location | null;
  selectedLocation: Location | null;
  newLocation: NewLocation | null;
  setHighlightedLocation: (highlightedLocation: Location | null) => void;
  setSelectedLocation: (selectedLocation: Location | null) => void;
  setNewLocation: (newLocation: NewLocation | null) => void;
}

const LocationContext = createContext<LocationContextType>({
  highlightedLocation: null,
  selectedLocation: null,
  newLocation: null,
  setHighlightedLocation: () => {},
  setSelectedLocation: () => {},
  setNewLocation: () => {},
});

export const LocationProvider = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  const [highlightedLocation, setHighlightedLocation] =
    useState<Location | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [newLocation, setNewLocation] = useState<NewLocation | null>(null);

  useEffect(() => {
    if (!pathname.startsWith('/dashboard/location')) setSelectedLocation(null);
  }, [pathname, setSelectedLocation]);

  return (
    <LocationContext
      value={{
        highlightedLocation,
        selectedLocation,
        newLocation,
        setHighlightedLocation,
        setSelectedLocation,
        setNewLocation,
      }}
    >
      {children}
    </LocationContext>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context)
    throw new Error('useLocation must be used within LocationProvider');
  return context;
};
