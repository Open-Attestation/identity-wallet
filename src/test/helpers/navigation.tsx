export const mockNavigation: any = {
  navigate: jest.fn(),
  dispatch: jest.fn(),
  goBack: jest.fn(),
  getParam: jest.fn()
};

export const resetNavigation = (): void => {
  mockNavigation.navigate.mockReset();
  mockNavigation.dispatch.mockReset();
  mockNavigation.goBack.mockReset();
  mockNavigation.getParam.mockReset();
};

export const setParam = (param: any): void => {
  mockNavigation.getParam.mockReturnedValue(param);
};
