import { get, post } from "../lib/http.service";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const sendOtp = async (phone) => {
  try {
    return await post(`${API_URL}/send-otp`, phone);
  } catch (error) {
    console.error("Error sending otp: ", error);
  }
};

export const verifyOtp = async (data) => {
  try {
    return await post(`${API_URL}/verify-otp`, {
      ...data,
    });
  } catch (error) {
    console.error("Error verifying otp: ", error);
  }
};

export const postLogin = async ({
  firstname,
  lastname,
  email,
  phone,
  authMethod,
  profile_picture,
}) => {
  try {
    return await post(`${API_URL}/login`, {
      firstname,
      lastname,
      email,
      phone,
      authMethod,
      profile_picture,
    });
  } catch (error) {
    console.error("Error logging in: ", error);
  }
};

export const postRegister = async ({
  email,
  authMethod,
  phone,
  firstname,
  lastname,
}) => {
  try {
    return await post(`${API_URL}/register`, {
      email,
      authMethod,
      phone,
      firstname,
      lastname,
    });
  } catch (error) {
    console.error("Error registering: ", error);
  }
};

export const getProfile = async () => {
  try {
    return await get(`${API_URL}/profile`);
  } catch (error) {
    console.error("Error getting profile: ", error);
  }
};
