export const mockNavigation: any = {
  navigate: jest.fn(),
  dispatch: jest.fn()
};

export const resetNavigation = (): void => {
  mockNavigation.navigate.mockReset();
  mockNavigation.dispatch.mockReset();
};
