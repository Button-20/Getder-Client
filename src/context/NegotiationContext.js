import { createContext, useContext, useEffect, useState } from "react";
const { storageService } = require("../lib/storage.service");

export const NegotiationContext = createContext({
  negotiation: null,
  setNegotiation: () => {},
});

export const NegotiationProvider = ({ children }) => {
  const [negotiation, setNegotiation] = useState(null);

  useEffect(() => {
    (async () => {
      let savedNegotiation = await storageService.getNegotiation();

      if (savedNegotiation) {
        setNegotiation(savedNegotiation);
      }
    })();
  }, []);

  useEffect(() => {
    const updateNegotiationInStorage = async () => {
      await storageService.setNegotiation(negotiation);
    };

    if (negotiation !== null) {
      updateNegotiationInStorage();
    }
  }, [negotiation]);

  return (
    <NegotiationContext.Provider value={{ negotiation, setNegotiation }}>
      {children}
    </NegotiationContext.Provider>
  );
};

export const useNegotiationContext = () => {
  const context = useContext(NegotiationContext);
  if (context === undefined) {
    throw new Error(
      "useNegotiationContext must be used within a NegotiationProvider"
    );
  }
  return context;
};
