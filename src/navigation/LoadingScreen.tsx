import React, { useEffect, FunctionComponent } from "react";
import { Text, View } from "react-native";
import { NavigationProps } from "./types";
import { useDbContext } from "../context/db";
import sampleData from "../sample.json";
import * as RxDB from "rxdb";
import { get } from "lodash";
import { Document } from "@govtechsg/open-attestation";

RxDB.plugin(require("pouchdb-adapter-asyncstorage").default);

const documentSchema = {
  version: 0,
  type: "object",
  properties: {
    id: {
      type: "string",
      primary: true
    },
    created: {
      type: "number",
      index: true
    },
    verified: {
      type: "number",
      index: true
    },
    document: {
      type: "object"
    }
  }
};

const createDatabase = async (): Promise<RxDB.RxDatabase> => {
  const db = await RxDB.create({
    name: "db",
    adapter: "asyncstorage",
    password: "supersecret",
    multiInstance: false,
    pouchSettings: { skip_setup: true } // eslint-disable-line @typescript-eslint/camelcase
  });
  await db.collection({
    name: "documents",
    schema: documentSchema
  });
  return db;
};

const seedDb = async (db: RxDB.RxDatabase, doc: Document): Promise<void> => {
  const id = get(doc, "signature.targetHash");
  const defaultDocument = await db.documents.findOne({ id }).exec();
  if (!defaultDocument) {
    await db.documents.insert({
      id,
      created: Date.now(),
      document: doc
    });
  }
};

const init = async ({
  setDb,
  done
}: {
  setDb: Function;
  done: Function;
}): Promise<void> => {
  const db = await createDatabase();
  setDb(db);
  await seedDb(db, sampleData);
  done();
};

const LoadingScreen: FunctionComponent<NavigationProps> = ({
  navigation
}: NavigationProps) => {
  const { setDb } = useDbContext();

  // To initialise database
  useEffect(() => {
    init({
      setDb,
      done: () => navigation.navigate("StackNavigator")
    });
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Loading...</Text>
    </View>
  );
};

export default LoadingScreen;
