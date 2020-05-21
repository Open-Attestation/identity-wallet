import React, {
  createContext,
  useContext,
  useState,
  FunctionComponent,
  Dispatch,
  SetStateAction
} from "react";
import { Database } from "../types";

interface DbContext {
  db?: Database;
  setDb?: Dispatch<SetStateAction<Database | undefined>>;
}

export const DbContext = createContext<DbContext>({
  db: undefined,
  setDb: undefined
});

export const useDbContext = (): DbContext => useContext<DbContext>(DbContext);

export const DbContextProvider: FunctionComponent = ({ children }) => {
  const [db, setDb] = useState<Database>();
  return (
    <DbContext.Provider value={{ db, setDb }}>{children}</DbContext.Provider>
  );
};
