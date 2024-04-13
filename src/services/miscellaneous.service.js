import { get } from "../lib/http.service";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const getCarTypes = async (data) => {
  return await get(`${API_URL}/vehicle_types`, data);
};

export const getReverseGeocode = async (data) => {
  try {
    return await get(
      `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY}&address=${data}`
    );
  } catch (error) {
    console.log(error);
  }
};

export const getTravelTime = async (data) => {
  try {
    return await get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${data.pickup_location}&destinations=${data.dropoff_location}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY}`
    );
  } catch (error) {
    console.log(error);
  }
};
