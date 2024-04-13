import { createContext, useContext, useState } from "react";

export const SpinnerContext = createContext({
  spinner: false,
  setSpinner: () => {},
});

export const SpinnerProvider = ({ children }) => {
  const [spinner, setSpinner] = useState(false);

  return (
    <SpinnerContext.Provider value={{ spinner, setSpinner }}>
      {children}
    </SpinnerContext.Provider>
  );
};

export const useSpinnerContext = () => {
  const context = useContext(SpinnerContext);
  if (context === undefined) {
    throw new Error("useSpinnerContext must be used within a SpinnerProvider");
  }
  return context;
};
