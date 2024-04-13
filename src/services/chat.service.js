import { io } from "socket.io-client";
import { get } from "../lib/http.service";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const getChatSessionById = async (id) => {
  return await get(`${API_URL}/chat_session/${id}`);
};

export const initSocket = () => {
  return io(API_URL, {
    transports: ["websocket"],
  });
};

export const emitMessage = (socket, message) => {
  socket.emit("send-message", message);
};

export const emitTyping = (socket, message) => {
  socket.emit("typing", message);
};
