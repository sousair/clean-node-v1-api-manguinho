import * as sut from './db-add-account-protocols';

describe('DbAddAccount Protocols', () => {
  test('Should all exported files to be defined', () => {
    Object.keys(sut).forEach((exportedFile) => {
      expect(sut[exportedFile]).toBeDefined();
    });
  });
});
