import { ChatAttachment } from "rest-api/types/attachments";
import {
  ChatList,
  ChatMessage,
  ChatRoom,
  ChatTag,
  ChatTask,
  GroupedChatMessages,
  SelectedChatMessage,
} from "rest-api/types/chats";
import { Pricing } from "rest-api/types/pricing";
import { createStore } from "zustand";
import { groupChatMessages } from "../[chatId]/chat-history";
import { FileWithId, setReplyTo, setValue } from "../chat-input/input-store";

export type Store = {
  services: Pricing[];
  chat: ChatRoom | null;
  messages: ChatMessage[];
  grouped_messages: GroupedChatMessages;
  chats: ChatRoom[];
  tasks: ChatTask[];
  selectedMessages: SelectedChatMessage[];
  tasks_filter_list: number | null;
  localAttachements: FileWithId[]; // Attachements that uploaded by user, so the can be show immediately and not wait for sync with storage and db
  attachmentPreview: ChatAttachment | null;
};

const initialState: Store = {
  attachmentPreview: null,
  chat: null,
  selectedMessages: [],
  localAttachements: [],
  services: [],
  messages: [],
  grouped_messages: {},
  chats: [],
  tasks: [],
  tasks_filter_list: -2,
};

export const createChatApi = (initState: Partial<Store> = initialState) => {
  const state = { ...initialState, ...initState };
  return createStore<Store>()((set) => ({
    ...state,
  }));
};

export const chat = createChatApi();

export const syncMessages = () => {
  const messages = chat.getState().messages;
  chat.setState(() => ({
    grouped_messages: groupChatMessages(messages),
  }));
};

export const getChatTags = () => {
  const chatState = chat.getState().chat;
  return (chatState?.tags ?? []) as ChatTag[];
};

export const getChatTaskLists = () => {
  const chatState = chat.getState().chat;
  return (chatState?.task_lists ?? []) as ChatList[];
};
export const getChatAttachments = () => {
  const chatState = chat.getState().chat;
  return (chatState?.attachments ?? []) as ChatAttachment[];
};

export const getChatAttachmentsById = (ids: string[]) => {
  const state = getChatAttachments();
  return state
    .map((attachment) => {
      if (ids.includes(attachment.id)) return attachment;
      else return null;
    })
    .filter((attachment) => !!attachment);
};

export const setTasks = (tasks: ChatTask[]) => chat.setState(() => ({ tasks }));

export const setServices = (services: Pricing[]) =>
  chat.setState(() => ({ services }));

export const getChat = () => chat.getState().chat;
export const setChat = (chatRoom: ChatRoom | null) => {
  chat.setState(() => ({ chat: chatRoom }));
};
export const getMessage = (id: string): ChatMessage | null => {
  const messages = chat.getState().messages;
  const message = messages.find((message) => message.id === id);
  return message ? message : null;
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

export const setTasksFilterList = (tasks_filter_list: number | null) =>
  chat.setState(() => ({ tasks_filter_list }));

export const getTask = (id: string) => {
  const tasks = chat.getState().tasks;
  return tasks.find((task) => task.id === id);
};

export const pushTask = (task: ChatTask) =>
  chat.setState((state) => ({
    tasks: [...state.tasks, task],
  }));
export const updateTask = (task: ChatTask) =>
  chat.setState((state) => ({
    tasks: state.tasks.map((msg) => {
      if (msg.id === task.id) return task;
      else return msg;
    }),
  }));

export const deleteTask = (id: string) =>
  chat.setState((state) => ({
    tasks: state.tasks.filter((task) => task.id !== id),
  }));

export const pushMessage = (message: ChatMessage) => {
  chat.setState((state) => ({
    messages: [...state.messages, message],
  }));
  syncMessages();
};
export const updateMessage = (message: ChatMessage) => {
  chat.setState((state) => ({
    messages: state.messages.map((msg) => {
      if (msg.id === message.id) return message;
      else return msg;
    }),
  }));
  syncMessages();
};

export const replaceMessage = (id: string, message: ChatMessage) => {
  chat.setState((state) => ({
    messages: state.messages.map((msg) => {
      if (msg.id === id) return message;
      else return msg;
    }),
  }));
  syncMessages();
};
export const deleteMessage = (id: string) => {
  chat.setState((state) => ({
    messages: state.messages.filter((message) => message.id !== id),
  }));
  syncMessages();
};

export const setMessages = (messages: ChatMessage[]) => {
  chat.setState(() => ({ messages }));
  syncMessages();
};
export const setChats = (chatRooms: ChatRoom[]) =>
  chat.setState({ chats: chatRooms });

export const setAttachmentPreview = (attachment: ChatAttachment | null) =>
  chat.setState({ attachmentPreview: attachment });

export const setSelectedMessages = (messages: SelectedChatMessage[]) =>
  chat.setState({ selectedMessages: messages });
export const addSelectedMessage = (message: SelectedChatMessage) =>
  chat.setState((state) => ({
    selectedMessages: [...state.selectedMessages, message],
  }));
export const removeSelectedMessage = (id: string) =>
  chat.setState((state) => ({
    selectedMessages: state.selectedMessages.filter((m) => m.id !== id),
  }));
export const clearSelectedMessages = () =>
  chat.setState({ selectedMessages: [] });
export const getSelectedMessages = () => chat.getState().selectedMessages;
