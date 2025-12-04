import React, { useState, useEffect, useContext, createContext } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { EntryDetail } from './pages/EntryDetail';

// Simple Router Context
type Route = {
  path: string;
  params: any;
};

interface RouterContextType {
  route: Route;
  navigate: (path: string, params?: any) => void;
}

const RouterContext = createContext<RouterContextType>({
  route: { path: '', params: {} },
  navigate: () => {},
});

export const useNavigate = () => useContext(RouterContext);

function App() {
  const [route, setRoute] = useState<Route>({ path: '', params: {} });

  // Handle initial hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // remove #
      // Basic split for query params logic could go here, but keeping it simple for state-based nav
      if (hash === '') {
        setRoute({ path: '', params: {} });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Init

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string, params: any = {}) => {
    setRoute({ path, params });
    // We aren't really using hash for deep linking fully in this simple version 
    // to keep state clean, but we update hash to allow 'back' to some extent
    if (path === '') window.location.hash = '';
    else window.location.hash = path;
  };

  return (
    <RouterContext.Provider value={{ route, navigate }}>
      <Layout>
        {route.path === '' && <Dashboard />}
        {route.path === 'entry' && (
          <EntryDetail 
            id={route.params.id} 
            initialDate={route.params.date} 
            isNew={route.params.isNew} 
          />
        )}
      </Layout>
    </RouterContext.Provider>
  );
}

export default App;