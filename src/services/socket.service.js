import { io } from "socket.io-client";
import { TRIGGERS } from "../utils/variables";
const socket = io(process.env.EXPO_PUBLIC_API_URL.replace("/api/v1", ""));

export const joinSocketServer = (token, location) => {
  socket.emit("join", { token, location });
};

export const listenForNewNegotiations = async () => {
  return await new Promise(async (resolve, reject) => {
    try {
      socket.on(TRIGGERS.NEW_NEGOTIATION, (data) => {
        resolve(data);
        
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export const listenForNegotiationUpdates = async () => {
  return await new Promise(async (resolve, reject) => {
    try {
      socket.on(TRIGGERS.NEGOTIATION_UPDATE, (data) => {
        resolve(data);
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
