import { createContext, useContext, useState } from "react";

export const PhoneAuthContext = createContext({
  phoneAuth: null,
  setPhoneAuth: () => {},
});

export const PhoneAuthProvider = ({ children }) => {
  const [phoneAuth, setPhoneAuth] = useState(null);

  return (
    <PhoneAuthContext.Provider value={{ phoneAuth, setPhoneAuth }}>
      {children}
    </PhoneAuthContext.Provider>
  );
};

export const usePhoneAuthContext = () => {
  const context = useContext(PhoneAuthContext);
  if (context === undefined) {
    throw new Error("usePhoneAuthContext must be used within a PhoneAuthProvider");
  }
  return context;
};
