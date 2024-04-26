import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';
import Reducer from './Reducer';
import { Action } from './Actions';
// types/User.ts
export interface User {
  name: string;
  email: string;
  // ... other user properties
}
// types/StateTypes.ts
export interface State {
  user: User | null;
  error: boolean;
}

// Define the shape of the context type
interface UserContextType {
    state: State;
    dispatch: Dispatch<Action>;
  }


// Create the context with a default value of null
const UserContext = createContext<UserContextType | null>(null);

// Type for props accepted by the UserProvider component
interface UserProviderProps {
  children: ReactNode; // ReactNode is a type that encompasses any valid React child
}

// UserProvider component definition
const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const initialState: State = {
    user: null,
    error: false,
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

  // Here, we're casting the value to UserContextType because we're certain it matches the shape
  const value = { state, dispatch } as UserContextType;

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };