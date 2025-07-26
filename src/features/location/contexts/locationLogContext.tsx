import {
  type PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';

import type { LocationLog } from '../actions/locationLogAction';

interface LocationLogContextType {
  highlightedLog: LocationLog | null;
  selectedLog: LocationLog | null;
  setHighlightedLog: (log: LocationLog | null) => void;
  setSelectedLog: (log: LocationLog | null) => void;
}

const LocationLogContext = createContext<LocationLogContextType>({
  highlightedLog: null,
  selectedLog: null,
  setHighlightedLog: () => {},
  setSelectedLog: () => {},
});

export const LocationLogProvider = ({ children }: PropsWithChildren) => {
  const [highlightedLog, setHighlightedLog] = useState<LocationLog | null>(
    null,
  );
  const [selectedLog, setSelectedLog] = useState<LocationLog | null>(null);

  return (
    <LocationLogContext.Provider
      value={{ highlightedLog, selectedLog, setHighlightedLog, setSelectedLog }}
    >
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
