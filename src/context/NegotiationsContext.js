import { createContext, useContext, useState } from "react";

export const NegotiationsContext = createContext({
  negotiations: [],
  setNegotiations: () => {},
});

export const NegotiationsProvider = ({ children }) => {
  const [negotiations, setNegotiations] = useState([]);

  return (
    <NegotiationsContext.Provider value={{ negotiations, setNegotiations }}>
      {children}
    </NegotiationsContext.Provider>
  );
};

export const useNegotiationsContext = () => {
  const context = useContext(NegotiationsContext);
  if (context === undefined) {
    throw new Error(
      "useNegotiationsContext must be used within a NegotiationsProvider"
    );
  }
  return context;
};
