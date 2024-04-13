import { decode as atob } from "base-64";
import { storageService } from "./storage.service";

const authGuard = async () => {
  const token = await storageService.getAccessToken();
  if (token && isTokenValid(token)) {
    return true;
  }
  return false;
};

function decodeToken(token) {
  const [header, payload, signature] = token.split(".");
  if (!payload) {
    return null;
  } else {
    return JSON.parse(atob(payload));
  }
}

function isTokenValid(token) {
  const decodedToken = decodeToken(token);
  const currentTimestamp = Math.floor(Date.now() / 1000);
  return decodedToken.exp > currentTimestamp;
}

export default authGuard;
