const params: any = {};

export const mockNavigation: any = {
  navigate: jest.fn(),
  dispatch: jest.fn(),
  emit: jest.fn(),
  goBack: jest.fn(),
  getParam: (key: string) => params[key],
  addListener: jest.fn(),
  state: {
    routeName: "routeName"
  }
};

export const mockRoute: any = {
  params: params
};

export const mockState: any = {
  index: 3,
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

export const resetNavigation = (): void => {
  mockNavigation.navigate.mockReset();
  mockNavigation.dispatch.mockReset();
  mockNavigation.goBack.mockReset();
};

export const setParam = (key: string, value: any): void => {
  params[key] = value;
};
