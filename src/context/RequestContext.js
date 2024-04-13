import { createContext, useContext, useEffect, useState } from "react";
const { storageService } = require("../lib/storage.service");

export const RequestContext = createContext({
  request: {
    pickup_location: null,
    dropoff_location: null,
    car_type: "Comfort",
    suggested_price: '20',
    code: "GHS",
    symbol: "₵",
  },
  setRequest: () => {},
});

export const RequestProvider = ({ children }) => {
  const [request, setRequest] = useState({
    pickup_location: null,
    dropoff_location: null,
    car_type: "Comfort",
    suggested_price: '20',
    code: "GHS",
    symbol: "₵",
  });

  useEffect(() => {
    (async () => {
      let savedRequest = await storageService.getRequest();

      if (savedRequest) {
        setRequest(savedRequest);
      }
    })();
  }, []);

  return (
    <RequestContext.Provider value={{ request, setRequest }}>
      {children}
    </RequestContext.Provider>
  );
};

export const useRequestContext = () => {
  const context = useContext(RequestContext);
  if (context === undefined) {
    throw new Error("useRequestContext must be used within a RequestProvider");
  }
  return context;
};
