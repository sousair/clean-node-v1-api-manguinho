import * as sut from './signup-protocols';

describe('SignUp Protocols', () => {
  test('Should all exported files to be defined', () => {
    Object.keys(sut).forEach((exportedFile) => {
      expect(sut[exportedFile]).toBeDefined();
    });
  });
});
