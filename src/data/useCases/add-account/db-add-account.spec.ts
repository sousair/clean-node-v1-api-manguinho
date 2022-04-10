import { DbAddAccount } from './db-add-account';
import { AddAccount, Encrypter } from './db-add-account-protocols';

describe('DbAddAccount UseCase', () => {
  let sut: AddAccount;
  let encrypterStub: Encrypter;

  beforeEach(() => {
    class EncrypterStub {
      async encrypt(value: string): Promise<string> {
        return Promise.resolve('hashedValue');
      }
    }

    encrypterStub = new EncrypterStub();
    sut = new DbAddAccount(encrypterStub);
  });

  test('Should call Encrypter with correct password', async () => {
    const accountData = {
      name: 'name',
      email: 'email@domain.com',
      password: 'password',
    };

    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');

    await sut.add(accountData);

    expect(encryptSpy).toHaveBeenCalledWith(accountData.password);
  });

  test('Should throw if Encrypter throws', async () => {
    const accountData = {
      name: 'name',
      email: 'email@domain.com',
      password: 'password',
    };

    jest.spyOn(encrypterStub, 'encrypt').mockRejectedValue(new Error());

    const promise = sut.add(accountData);

    await expect(promise).rejects.toThrow();
  });
});
