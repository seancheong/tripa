import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface SidebarContextType {
  isSidebarOpen: boolean | null;
  toggleSidebar: () => void;
}

const isSidebarOpenKey = 'isTripaSidebarOpen';

const SidebarContext = createContext<SidebarContextType>({
  isSidebarOpen: null,
  toggleSidebar: () => {},
});

export const SidebarProvider = ({ children }: PropsWithChildren) => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean | null>(null);

  const toggleSidebar = () => {
    if (isSidebarOpen === null) return;

    setSidebarOpen(!isSidebarOpen);
    localStorage.setItem(isSidebarOpenKey, String(!isSidebarOpen));
  };

  useEffect(() => {
    const saved = localStorage.getItem(isSidebarOpenKey);
    setSidebarOpen(saved === 'true');
  }, []);

  return (
    <SidebarContext value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context)
    throw new Error('useSidebar must be used within SidebarProvider');
  return context;
};
