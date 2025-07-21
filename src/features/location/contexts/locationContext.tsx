import { PropsWithChildren, createContext, useContext, useState } from 'react';

import type { Location, NewLocation } from '../actions/locationAction';

interface LocationContextType {
  selectedLocation: Location | null;
  newLocation: NewLocation | null;
  shouldFly: boolean;
  setSelectedLocation: (
    selectedLocation: Location | null,
    shouldFly?: boolean,
  ) => void;
  setNewLocation: (newLocation: NewLocation | null) => void;
}

const LocationContext = createContext<LocationContextType>({
  selectedLocation: null,
  newLocation: null,
  shouldFly: false,
  setSelectedLocation: () => {},
  setNewLocation: () => {},
});

export const LocationProvider = ({ children }: PropsWithChildren) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [newLocation, setNewLocation] = useState<NewLocation | null>(null);
  const [shouldFly, setShouldFly] = useState(false);

  const setLocation = (
    selectedLocation: Location | null,
    shouldFly: boolean = false,
  ) => {
    setSelectedLocation(selectedLocation);
    setShouldFly(shouldFly);
  };

  return (
    <LocationContext
      value={{
        selectedLocation,
        newLocation,
        shouldFly,
        setSelectedLocation: setLocation,
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
