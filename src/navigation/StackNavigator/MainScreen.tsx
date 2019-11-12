import React, { useEffect, useState, FunctionComponent } from "react";
import { Text, View, TouchableHighlight } from "react-native";
import { NavigationProps } from "../types";
import { useDbContext } from "../../context/db";

const MainScreen: FunctionComponent<NavigationProps> = ({
  navigation
}: NavigationProps) => {
  const { db } = useDbContext();
  const [secret, setSecret] = useState();

  useEffect(() => {
    db.heros
      .find()
      .sort({ name: 1 })
      .$.subscribe(setSecret);
  }, [true]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Loading...</Text>
      <Text>{JSON.stringify(secret)}</Text>
      <TouchableHighlight
        onPress={() => {
          db.heros.insert({ name: Math.random().toString(), color: "sjkdnf" });
        }}
      >
        <Text>Insert new records</Text>
      </TouchableHighlight>
    </View>
  );
};

export default MainScreen;
