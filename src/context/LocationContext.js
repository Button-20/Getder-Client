import { createContext, useContext, useEffect, useState } from "react";
const { storageService } = require("../lib/storage.service");

export const LocationContext = createContext({
  location: null,
  setLocation: () => {},
});

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let savedLocation = await storageService.getLocation();
      
      if (savedLocation) {
        setLocation(savedLocation);
      }
    })();
  }, []);

    useEffect(() => {
      const updateLocationInStorage = async () => {
        await storageService.setLocation(location);
      };

      if (location !== null) {
        updateLocationInStorage();
      }
    }, [location]);


  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error(
      "useLocationContext must be used within a LocationProvider"
    );
  }
  return context;
};
