"use client";
import React, {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useEffect,
} from "react";

type State = {
  user: any;
  loading: boolean;
  error: any;
};

type Action =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: any }
  | { type: "LOGIN_FAILURE"; payload: any }
  | { type: "LOGOUT" };

const INITIAL_STATE: State = {
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user")!) || null
      : null,
  loading: false,
  error: null,
};

export type AuthContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const Reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthProviderProps> = ({
  children,
}) => {
  const initialState: State = {
    user: null,
    error: false,
    loading: false,
  };

  const [state, dispatch] = useReducer(Reducer, initialState);
  useEffect(() => {
    // console.log("state ",state);
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state]);

  // Here, we're casting the value to UserContextType because we're certain it matches the shape
  const value = { state, dispatch } as AuthContextType;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
