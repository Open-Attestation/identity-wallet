import { Platform } from "react-native";
import { DatabaseCollections } from "../../types";
import * as RxDB from "rxdb";
import { DB_CONFIG } from "../../config";
import * as SQLite from "expo-sqlite";
import SQLiteAdapterFactory from "pouchdb-adapter-react-native-sqlite";

if (Platform.OS === "web") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  RxDB.plugin(require("pouchdb-adapter-idb"));
} else {
  RxDB.plugin(SQLiteAdapterFactory(SQLite));
}

export const initialiseDb = async ({
  db,
  setDb,
  onInitDb
}: {
  db?: RxDB.RxDatabase<DatabaseCollections>;
  setDb?: Function;
  onInitDb: Function;
}): Promise<void> => {
  if (!db) {
    const createdDb = await RxDB.create<DatabaseCollections>(DB_CONFIG.db);
    await createdDb.collection(DB_CONFIG.documentsCollection);
    setDb!(createdDb);
  }
  onInitDb();
};
