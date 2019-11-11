import React, { createContext, useContext, useReducer } from "react";
import { RxDatabase } from "rxdb";

export interface ContextState {
  db: RxDatabase;
}

export interface DispatchAction {
  type: string;
  payload: any;
}

export const Context = createContext({});

export const useContextValue = (): [
  ContextState,
  (action: DispatchAction) => any
] => useContext(Context) as any;

interface ContextProviderProps {
  reducer: any;
  initialState: object;
  children: object;
}

export const ContextProvider = ({
  reducer,
  initialState,
  children
}: ContextProviderProps) => (
  <Context.Provider value={useReducer(reducer, initialState)}>
    {children}
  </Context.Provider>
);
