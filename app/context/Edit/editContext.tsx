"use client";
import React, {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useEffect,
} from "react";

interface EDITProviderProps {
  children: ReactNode;
}

type State = {
  [key: string]: any;
};

const INITIAL_STATE: State =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("editReport") || "{}")
    : null;

type Action = { type: "SET_EDITRD"; payload: any } | { type: "RESET" };

export type EDITContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

export const EDITContext = createContext<EDITContextType | null>(null);

const Reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_EDITRD":
      return {
        ...state,
        ...action.payload,
      };
    case "RESET":
      return { resetted: "i am clear now" };
    default:
      return state;
  }
};

export const EDITContextProvider: React.FC<EDITProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  useEffect(() => {
    console.log("present state od edit is ", state);
    localStorage.setItem("editReport", JSON.stringify(state));
    console.log("editReport is ", state);
  }, [state]);

  // Here, we're casting the value to UserContextType because we're certain it matches the shape
  const value = { state, dispatch } as EDITContextType;

  return <EDITContext.Provider value={value}>{children}</EDITContext.Provider>;
};
