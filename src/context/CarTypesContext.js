import { createContext, useContext, useEffect, useState } from "react";
const { storageService } = require("../lib/storage.service");

export const CarTypesContext = createContext({
  carTypes: [],
  setCarTypes: () => {},
});

export const CarTypesProvider = ({ children }) => {
  const [carTypes, setCarTypes] = useState([]);

  useEffect(() => {
    (async () => {
      let savedCarTypes = await storageService.getCarTypes();

      if (savedCarTypes) {
        setCarTypes(savedCarTypes);
      }
    })();
  }, []);

  useEffect(() => {
    const updateCarTypesInStorage = async () => {
      await storageService.setCarTypes(carTypes);
    };

    if (carTypes.length > 0) {
      updateCarTypesInStorage();
    }
  }, [carTypes]);

  return (
    <CarTypesContext.Provider value={{ carTypes, setCarTypes }}>
      {children}
    </CarTypesContext.Provider>
  );
};

export const useCarTypesContext = () => {
  const context = useContext(CarTypesContext);
  if (context === undefined) {
    throw new Error(
      "useCarTypesContext must be used within a CarTypesProvider"
    );
  }
  return context;
};
