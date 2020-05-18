import React, { ReactElement } from "react";
import { DbContextProvider } from "../context/db";
import { Content } from "./Content";
import { NetworkContextProvider } from "../context/network";
import { ConfigContextProvider } from "../context/config";
import { ErrorBoundary } from "../components/ErrorBoundary/ErrorBoundary";
import { FontLoader } from "../components/FontLoader";
import { Providers } from "../context/composeProviders";

const App = (): ReactElement => {
  return (
    <ErrorBoundary>
      <FontLoader>
        <Providers
          providers={[
            NetworkContextProvider,
            ConfigContextProvider,
            DbContextProvider
          ]}
        >
          <Content />
        </Providers>
      </FontLoader>
    </ErrorBoundary>
  );
};

export default App;
