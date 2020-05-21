export const navigation: any = {
  navigate: (path: string): void => alert(path),
  dispatch: (action: any): void => alert(JSON.stringify(action)),
  goBack: () => alert("Back"),
  addListener: () => ({ remove: () => null })
};

export const mockState: any = {
  index: 4,
  routes: [
    {
      key: "DocumentListStackScreen-M7lptkH0Nf34d5loKT3ja",
      name: "DocumentListStackScreen",
      params: undefined
    },
    {
      key: "QrScannerStackScreen-DDEZ0HJZVo-tNfuNyfG92",
      name: "QrScannerStackScreen",
      params: undefined
    },
    {
      key: "SettingsScreen-lhqLSl5rGkdVWkrBDlB7P",
      name: "SettingsScreen",
      params: undefined
    },
    {
      key: "InitialisationScreen-QG-oYnUzsm4qkR2TL8L-4",
      name: "InitialisationScreen",
      params: undefined
    }
  ],
  routeNames: [
    "DocumentListStackScreen",
    "QrScannerStackScreen",
    "SettingsScreen",
    "InitialisationScreen"
  ]
};
