import React, {
  createContext,
  useContext,
  useState,
  FunctionComponent
} from "react";
import { Database } from "../types";

interface DbContext {
  db?: Database;
  setDb?: (db: Database) => void;
}

export const DbContext = createContext<DbContext>({
  db: undefined,
  setDb: undefined
});

export const useDbContext = (): DbContext => useContext<DbContext>(DbContext);

export const DbContextProvider: FunctionComponent = ({ children }) => {
  const [db, setDb] = useState();
  return (
    <DbContext.Provider value={{ db, setDb }}>{children}</DbContext.Provider>
  );
};
