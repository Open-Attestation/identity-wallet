// jest.config.js
module.exports = {
  verbose: true,
  preset: "@testing-library/react-native",
  setupFiles: ["./node_modules/react-native-gesture-handler/jestSetup.js"],
  setupFilesAfterEnv: ["./jest.setup.ts"]
};
