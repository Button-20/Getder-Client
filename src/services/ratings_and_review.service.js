import { post } from "../lib/http.service";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const createRatingAndReview = async ({
  request,
  driver,
  rating,
  review,
}) => {
  return await post(`${API_URL}/rating_and_review`, {
    request,
    driver,
    rating,
    review,
  });
};
