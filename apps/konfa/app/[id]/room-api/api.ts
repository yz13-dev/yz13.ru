"use client";
import { createStore } from "zustand";
import { Participant } from "../participant";

type State = {
  roomId: string;
  participants: Participant[];
  focusedOn: string | null;
};

type Actions = {
  addParticipant: (participant: Participant) => void;
  updateParticipant: (participant: Participant) => void;
  deleteParticipant: (id: string) => void;
  setParticipants: (participants: Participant[]) => void;
  setFocusedOn: (id: string | null) => void;
};

export type Store = State & Actions;
export type InitialState = State;
const initialState: InitialState = {
  roomId: "",
  focusedOn: null,
  participants: [],
};

export const createRoomApi = (init?: Partial<InitialState>) => {
  const state = {
    ...initialState,
    ...init,
  };
  return createStore<Store>()((set) => ({
    ...state,
    addParticipant: (participant: Participant) =>
      set((state) => {
        const isAlreadyPresent = state.participants.some(
          (p) => p.user.id === participant.user.id,
        );
        if (isAlreadyPresent)
          return {
            participants: state.participants,
          };
        else {
          return {
            participants: [...state.participants, participant],
          };
        }
      }),
    updateParticipant: (participant: Participant) =>
      set((state) => {
        const isAlreadyPresent = state.participants.some(
          (p) => p.user.id === participant.user.id,
        );
        if (isAlreadyPresent)
          return {
            participants: state.participants.map((p) =>
              p.user.id === participant.user.id ? participant : p,
            ),
          };
        else {
          return {
            participants: state.participants,
          };
        }
      }),
    deleteParticipant: (id: string) =>
      set((state) => {
        const participants = state.participants.filter((p) => p.user.id !== id);
        return {
          participants,
        };
      }),
    setParticipants: (participants: Participant[]) =>
      set(() => ({ participants })),
    setFocusedOn: (focusedOn: string | null) =>
      set(() => ({
        focusedOn,
      })),
  }));
};
