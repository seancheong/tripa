import { PropsWithChildren, createContext, useContext, useState } from 'react';

import type { Location } from '../actions/locationAction';

interface LocationContextType {
  selectedLocation: Location | null;
  shouldFly: boolean;
  setSelectedLocation: (
    selectedLocation: Location | null,
    shouldFly?: boolean,
  ) => void;
}

const LocationContext = createContext<LocationContextType>({
  selectedLocation: null,
  shouldFly: false,
  setSelectedLocation: () => {},
});

export const LocationProvider = ({ children }: PropsWithChildren) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
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
      value={{ selectedLocation, shouldFly, setSelectedLocation: setLocation }}
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
