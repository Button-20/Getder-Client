import { get, post, put } from "../lib/http.service";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const createRequest = async ({
  pickup_location,
  dropoff_location,
  car_type,
  suggested_price,
  code,
  symbol,
}) => {
  return await post(`${API_URL}/request`, {
    pickup_location,
    dropoff_location,
    car_type,
    suggested_price,
    code,
    symbol,
  });
};

export const getRequests = async (data) => {
  return await get(`${API_URL}/requests`, data);
};

export const updateNegotiation = async ({ status, negotiation_id }) => {
  return await put(`${API_URL}/negotiation/${negotiation_id}`, { status });
};
