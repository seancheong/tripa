import {
  type PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';

import type { LocationLog } from '../actions/locationLogAction';

interface LocationLogContextType {
  selectedLog: LocationLog | null;
  setSelectedLog: (log: LocationLog | null) => void;
}

const LocationLogContext = createContext<LocationLogContextType>({
  selectedLog: null,
  setSelectedLog: () => {},
});

export const LocationLogProvider = ({ children }: PropsWithChildren) => {
  const [selectedLog, setSelectedLog] = useState<LocationLog | null>(null);

  return (
    <LocationLogContext.Provider value={{ selectedLog, setSelectedLog }}>
      {children}
    </LocationLogContext.Provider>
  );
};

export const useLocationLog = () => {
  const context = useContext(LocationLogContext);
  if (!context) {
    throw new Error('useLocationLog must be used within a LocationLogProvider');
  }
  return context;
};
