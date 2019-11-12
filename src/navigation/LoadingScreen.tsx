import React, { useEffect, useState, FunctionComponent } from "react";
import { Text, View, TouchableHighlight } from "react-native";
import { NavigationProps } from "./types";
import { useDbContext } from "../context/db";
import * as RxDB from "rxdb";

RxDB.plugin(require("pouchdb-adapter-asyncstorage").default);

const heroSchema = {
  version: 0,
  title: "hero schema",
  description: "describes a simple hero",
  type: "object",
  properties: {
    name: {
      type: "string",
      primary: true
    },
    color: {
      type: "string"
    }
  },
  required: ["color"]
};

const createDatabase = async () => {
  const db = await RxDB.create({
    name: "mydbname2",
    adapter: "asyncstorage",
    password: "supersecret",
    multiInstance: false,
    pouchSettings: { skip_setup: true }
  });
  await db.collection({
    name: "heros",
    schema: heroSchema
  });
  return db;
};

const LoadingScreen: FunctionComponent<NavigationProps> = ({
  navigation
}: NavigationProps) => {
  const { setDb } = useDbContext();

  // To initialise database
  useEffect(() => {
    createDatabase().then(db => {
      setDb(db);
      navigation.navigate("StackNavigator");
    });
  }, [true]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Loading...</Text>
    </View>
  );
};

export default LoadingScreen;
