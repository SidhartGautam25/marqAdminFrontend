"use client";
import React, {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useEffect,
} from "react";

interface ReportProviderProps {
  children: ReactNode;
}

type State = {
  cid: any;
  cpage: any;
};

const INITIAL_STATE: State = {
  cid:
    typeof window !== "undefined"
      ? localStorage.getItem("reportid") || null
      : null,
  cpage:
    typeof window !== "undefined"
      ? localStorage.getItem("reportpage") || null
      : null,
};

export type ReportContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

type Action =
  | { type: "SET_CURRENT"; payload: any }
  | { type: "SET_CURR_PAGE"; payload: any };

export const ReportContext = createContext<ReportContextType | null>(null);

const Reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_CURRENT":
      return {
        cid: action.payload.iid,
        cpage: 0,
      };
    case "SET_CURR_PAGE":
      return {
        cid: action.payload.iid,
        cpage: action.payload.page,
      };
    default:
      return state;
  }
};

export const ReportContextProvider: React.FC<ReportProviderProps> = ({
  children,
}) => {
  const initialState: State = {
    cid: 0,
    cpage: 0,
  };

  const [state, dispatch] = useReducer(Reducer, initialState);
  useEffect(() => {
    // console.log("state ",state);
    localStorage.setItem("reportid", state.cid);
    localStorage.setItem("reportpage", state.cpage);
  }, [state]);

  // Here, we're casting the value to UserContextType because we're certain it matches the shape
  const value = { state, dispatch } as ReportContextType;

  return (
    <ReportContext.Provider value={value}>{children}</ReportContext.Provider>
  );
};
