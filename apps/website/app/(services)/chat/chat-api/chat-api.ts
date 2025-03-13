import { ChatMessage, ChatRoom } from "@/types/chat";
import { Pricing } from "@/types/pricing";
import { createStore } from "zustand";

export type Store = {
  type: string | null;
  services: Pricing[];
  chat: ChatRoom | null;
  messages: ChatMessage[];
  chats: ChatRoom[];
};

const initialState: Store = {
  type: null,
  services: [],
  chat: null,
  messages: [],
  chats: [],
};

export const createChatApi = (initState: Partial<Store> = initialState) => {
  const state = { ...initialState, ...initState };
  return createStore<Store>()((set) => ({
    ...state,
  }));
};

export const chat = createChatApi();

export const setChatType = (type: string | null) =>
  chat.setState(() => ({ type }));

export const setServices = (services: Pricing[]) =>
  chat.setState(() => ({ services }));

export const setChat = (chatRoom: ChatRoom | null) => {
  chat.setState(() => ({ chat: chatRoom }));
  if (chatRoom) {
    setChatType(chatRoom.service_type);
  }
};

export const pushMessage = (message: ChatMessage) =>
  chat.setState((state) => ({
    messages: [...state.messages, message],
  }));

export const setMessages = (messages: ChatMessage[]) =>
  chat.setState(() => ({ messages }));
export const setChats = (chatRooms: ChatRoom[]) =>
  chat.setState({ chats: chatRooms });
