import { createContext, useContext, useEffect, useState } from "react";
const { storageService } = require("../lib/storage.service");

export const UserContext = createContext({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      let savedUser = await storageService.getUserDetails();
      if (savedUser) {
        setUser(savedUser);
      }
    })();
  }, []);

  useEffect(() => {
    const updateUserInStorage = async () => {
      await storageService.setUserDetails(user);
    };

    if (user !== null) {
      updateUserInStorage();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
