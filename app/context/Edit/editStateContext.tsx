"use client";
import React, {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useEffect,
} from "react";

interface EditCondProviderProps {
  children: ReactNode;
}

type State = {
  [key: string]: any;
};

const INITIAL_STATE: State =
  typeof window !== "undefined"
    ? JSON.parse(
        localStorage.getItem("EditCond") ||
          JSON.stringify({
            first: true,
            one: true,
            two: true,
            three: true,
            four: true,
            five: true,
            six: true,
            seven: true,
            eight: true,
            nine: true,
            ten: true,
            final: true,
          })
      )
    : null;

type Action = { type: "CHANGE_EDIT_COND"; payload: any };

export type EditCondContextType = {
  editstate: State;
  editdispatch: Dispatch<Action>;
};

export const EditCondContext = createContext<EditCondContextType | null>(null);

const Reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "CHANGE_EDIT_COND":
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export const EditCondContextProvider: React.FC<EditCondProviderProps> = ({
  children,
}) => {
  const [editstate, editdispatch] = useReducer(Reducer, INITIAL_STATE);
  useEffect(() => {
    console.log("present state is ", editstate);

    localStorage.setItem("EditCond", JSON.stringify(editstate));
    console.log("cond is ", editstate);
  }, [editstate]);

  // Here, we're casting the value to UserContextType because we're certain it matches the shape
  const value = { editstate, editdispatch } as EditCondContextType;

  return (
    <EditCondContext.Provider value={value}>
      {children}
    </EditCondContext.Provider>
  );
};
