import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { ContextProvider } from "./state";
import StackNavigator from "./StackNavigator";
import LoadingScreen from "./LoadingScreen";

const SwitchNavigator = createSwitchNavigator(
  { LoadingScreen, StackNavigator },
  { initialRouteName: "LoadingScreen" }
);

const AppContainer = createAppContainer(SwitchNavigator);

const App = () => {
  const initialState = {};

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case "SET_DB":
        return {
          ...state,
          db: action.payload
        };

      default:
        return state;
    }
  };

  return (
    <ContextProvider initialState={initialState} reducer={reducer}>
      <AppContainer />
    </ContextProvider>
  );
};

export default App;
