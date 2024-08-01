"use client";
import React, {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useEffect,
} from "react";

interface RDProviderProps {
  children: ReactNode;
}

type State = {
  [key: string]: any;
};

const INITIAL_STATE: State =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("rd") || "{}")
    : null;

type Action = { type: "SET_RD"; payload: any };

export type RDContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

export const RDContext = createContext<RDContextType | null>(null);

const Reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_RD":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const RDContextProvider: React.FC<RDProviderProps> = ({ children }) => {
  const initialState: State = {};

  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  useEffect(() => {
    console.log("present state is ", state);
    // console.log("state ",state);
    // localStorage.setItem("marq-rep-title", state.title);
    // localStorage.setItem("marq-rep-desc", state.desc);
    // localStorage.setItem("marq-rep-industry", state.industry);
    // localStorage.setItem("marq-rep-subind", state.subind);
    // localStorage.setItem("marq-rep-linki", state.linki);
    // localStorage.setItem("marq-rep-linkp", state.linkp);
    // localStorage.setItem("marq-rep-createdAt", state.createdAt);
    // localStorage.setItem("reportpage", state.cpage);
    // localStorage.setItem("marq-rep-linkt", state.linkt);
    // localStorage.setItem("marq-rep-linkf", state.linkf);
    // localStorage.setItem("marq-rep-study", state.study);
    // localStorage.setItem("marq-rep-base", state.base);
    // localStorage.setItem("marq-rep-forcast", state.forcast);
    // localStorage.setItem("marq-rep-forcast", state.dataSuite);
    // localStorage.setItem("marq-rep-forcast", state.insightReport);
    localStorage.setItem("rd", JSON.stringify(state));
  }, [state]);

  // Here, we're casting the value to UserContextType because we're certain it matches the shape
  const value = { state, dispatch } as RDContextType;

  return <RDContext.Provider value={value}>{children}</RDContext.Provider>;
};
