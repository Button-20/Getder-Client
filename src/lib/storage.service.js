import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoES from "crypto-es";
const {
  LOCATION,
  REQUEST,
  ACCESS_TOKEN,
  USER,
  CAR_TYPES,
  NEGOTIATION,
} = require("../utils/variables");
const SECRET_KEY = process.env.EXPO_PUBLIC_SECRET_KEY;

const set = async (key, value) => {
  try {
    const encryptedValue = CryptoES.AES.encrypt(
      JSON.stringify(value),
      SECRET_KEY
    ).toString();
    await AsyncStorage.setItem(key, encryptedValue);
  } catch (error) {
    console.error("Error setting storage: ", error);
  }
};

const get = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      const decryptedValue = CryptoES.AES.decrypt(value, SECRET_KEY).toString(
        CryptoES.enc.Utf8
      );
      return JSON.parse(decryptedValue);
    }
    return null;
  } catch (error) {
    console.error("Error getting storage: ", error);
  }
};

const remove = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing storage: ", error);
  }
};

const clear = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clearing storage: ", error);
  }
};

const setLocation = async (location) => {
  try {
    await set(LOCATION, location);
  } catch (error) {
    console.error("Error setting location: ", error);
  }
};

const getLocation = async () => {
  try {
    return await get(LOCATION);
  } catch (error) {
    console.error("Error getting location: ", error);
  }
};

const removeLocation = async () => {
  try {
    await remove(LOCATION);
  } catch (error) {
    console.error("Error removing location: ", error);
  }
};

const getRequest = async () => {
  try {
    return await get(REQUEST);
  } catch (error) {
    console.error("Error getting request: ", error);
  }
};

const setRequest = async (request) => {
  try {
    await set(REQUEST, request);
  } catch (error) {
    console.error("Error setting request: ", error);
  }
};

const removeRequest = async () => {
  try {
    await remove(REQUEST);
  } catch (error) {
    console.error("Error removing request: ", error);
  }
};

const getAccessToken = async () => {
  try {
    return await get(ACCESS_TOKEN);
  } catch (error) {
    console.error("Error getting access token: ", error);
  }
};

const setAccessToken = async (accessToken) => {
  try {
    await set(ACCESS_TOKEN, accessToken);
  } catch (error) {
    console.error("Error setting access token: ", error);
  }
};

const removeAccessToken = async () => {
  try {
    await remove(ACCESS_TOKEN);
  } catch (error) {
    console.error("Error removing access token: ", error);
  }
};

const getUserDetails = async () => {
  try {
    return await get(USER);
  } catch (error) {
    console.error("Error getting user details: ", error);
  }
};

const setUserDetails = async (user) => {
  try {
    await set(USER, user);
  } catch (error) {
    console.error("Error setting user details: ", error);
  }
};

const removeUserDetails = async () => {
  try {
    await remove(USER);
  } catch (error) {
    console.error("Error removing user details: ", error);
  }
};


const getCarTypes = async () => {
  try {
    return await get(CAR_TYPES);
  } catch (error) {
    console.error("Error getting car types: ", error);
  }
};

const setCarTypes = async (carTypes) => {
  try {
    await set(CAR_TYPES, carTypes);
  } catch (error) {
    console.error("Error setting car types: ", error);
  }
};

const removeCarTypes = async () => {
  try {
    await remove(CAR_TYPES);
  } catch (error) {
    console.error("Error removing car types: ", error);
  }
};

const getNegotiation = async () => {
  try {
    return await get(NEGOTIATION);
  } catch (error) {
    console.error("Error getting request: ", error);
  }
};

const setNegotiation = async (request) => {
  try {
    await set(NEGOTIATION, request);
  } catch (error) {
    console.error("Error setting request: ", error);
  }
};

const removeNegotiation = async () => {
  try {
    await remove(NEGOTIATION);
  } catch (error) {
    console.error("Error removing request: ", error);
  }
};



export const storageService = {
  set,
  get,
  remove,
  clear,
  setLocation,
  getLocation,
  removeLocation,
  getRequest,
  setRequest,
  removeRequest,
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  getUserDetails,
  setUserDetails,
  removeUserDetails,
  getCarTypes,
  setCarTypes,
  removeCarTypes,
  getNegotiation,
  setNegotiation,
  removeNegotiation
};
