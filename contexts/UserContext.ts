import { createContext } from "react";

export interface UserState {
  token: string;
  userId: string;
}

interface UserContext {
  value: UserState;
  setValue: React.Dispatch<React.SetStateAction<UserState>>;
}

export const UserContext = createContext<UserContext | null>(null);
