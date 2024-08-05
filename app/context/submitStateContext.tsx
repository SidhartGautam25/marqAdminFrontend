"use client";
import React, {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useEffect,
} from "react";

interface CondProviderProps {
  children: ReactNode;
}

type State = {
  [key: string]: any;
};

const INITIAL_STATE: State =
  typeof window !== "undefined"
    ? JSON.parse(
        localStorage.getItem("cond") ||
          JSON.stringify({
            first: false,
            one: false,
            two: false,
            three: false,
            four: false,
            five: false,
            six: false,
            seven: false,
            eight: false,
            nine: false,
          })
      )
    : null;

type Action = { type: "CHANGE_COND"; payload: any };

export type CondContextType = {
  state1: State;
  dispatch1: Dispatch<Action>;
};

export const CondContext = createContext<CondContextType | null>(null);

const Reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "CHANGE_COND":
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export const CondContextProvider: React.FC<CondProviderProps> = ({
  children,
}) => {
  const initialState: State = {};

  const [state1, dispatch1] = useReducer(Reducer, INITIAL_STATE);
  useEffect(() => {
    console.log("present state is ", state1);

    localStorage.setItem("cond", JSON.stringify(state1));
    console.log("cond is ", state1);
  }, [state1]);

  // Here, we're casting the value to UserContextType because we're certain it matches the shape
  const value = { state1, dispatch1 } as CondContextType;

  return <CondContext.Provider value={value}>{children}</CondContext.Provider>;
};
