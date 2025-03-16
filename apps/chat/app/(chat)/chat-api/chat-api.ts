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
export const getMessage = (id: string) => {
  const messages = chat.getState().messages;
  return messages.find((message) => message.id === id);
};

export const updateChatInList = (chatRoom: ChatRoom) => {
  const chats = chat.getState().chats;
  const index = chats.findIndex((chat) => chat.id === chatRoom.id);
  if (index !== -1) {
    const updated = chats.map((chat, chatIndex) => {
      if (chatIndex === index) return chatRoom;
      else return chat;
    });
    chat.setState(() => ({ chats: updated }));
  }
};

export const pushMessage = (message: ChatMessage) =>
  chat.setState((state) => ({
    messages: [...state.messages, message],
  }));
export const updateMessage = (message: ChatMessage) =>
  chat.setState((state) => ({
    messages: state.messages.map((msg) => {
      if (msg.id === message.id) return message;
      else return msg;
    }),
  }));
export const deleteMessage = (id: string) =>
  chat.setState((state) => ({
    messages: state.messages.filter((message) => message.id !== id),
  }));

export const setMessages = (messages: ChatMessage[]) =>
  chat.setState(() => ({ messages }));
export const setChats = (chatRooms: ChatRoom[]) =>
  chat.setState({ chats: chatRooms });
