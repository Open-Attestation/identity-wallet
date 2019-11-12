import React, { createContext, useContext, useState } from "react";
import { RxDatabase } from "rxdb";

export const DbContext = createContext({});

export const useDbContext = (): { db: RxDatabase; setDb: Function } =>
  useContext(DbContext) as any;

interface DbContextProviderProps {
  children: object;
}

export const DbContextProvider = ({ children }: DbContextProviderProps) => {
  const [db, setDb] = useState();
  return (
    <DbContext.Provider value={{ db, setDb }}>{children}</DbContext.Provider>
  );
};
