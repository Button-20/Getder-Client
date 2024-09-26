import { createContext, useContext, useEffect, useState } from "react";
const { storageService } = require("../lib/storage.service");

export const UserContext = createContext({
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(null);

  useEffect(() => {
    (async () => {
      let savedUser = await storageService.getUserDetails();
      if (savedUser) {
        setUser(savedUser);
      }
    })();

    (async () => {
      let savedToken = await storageService.getAccessToken();
      if (savedToken) {
        setToken(savedToken);
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

  useEffect(() => {
    const setAccessToken = async (accessToken) => {
      await storageService.setAccessToken(accessToken);
    };

    if (token !== null) {
      setAccessToken(token);
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
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
