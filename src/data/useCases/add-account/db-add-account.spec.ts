import { DbAddAccount } from './db-add-account';
import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  Encrypter,
  AddAccountRepository,
} from './db-add-account-protocols';

describe('DbAddAccount UseCase', () => {
  const accountData = {
    name: 'name',
    email: 'email@domain.com',
    password: 'password',
  };

  let sut: AddAccount;
  let encrypterStub: Encrypter;
  let addAccountRepositoryStub: AddAccountRepository;

  beforeEach(() => {
    class EncrypterStub implements Encrypter {
      async encrypt(value: string): Promise<string> {
        return Promise.resolve('hashedValue');
      }
    }

    class AddAccountRepositoryStub implements AddAccountRepository {
      async add(account: AddAccountModel): Promise<AccountModel> {
        return Promise.resolve({
          id: 'validId',
          name: 'validName',
          email: 'validEmail@domain.com',
          password: 'hashedValue',
        });
      }
    }

    encrypterStub = new EncrypterStub();
    addAccountRepositoryStub = new AddAccountRepositoryStub();
    sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub);
  });

  test('Should call Encrypter with correct password', async () => {
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');

    await sut.add(accountData);

    expect(encryptSpy).toHaveBeenCalledWith(accountData.password);
  });

  test('Should throw if Encrypter throws', async () => {
    jest.spyOn(encrypterStub, 'encrypt').mockRejectedValue(new Error());

    const promise = sut.add(accountData);

    await expect(promise).rejects.toThrow();
  });

  test('Should call AddAccountRepository with correct values', async () => {
    const add = jest.spyOn(addAccountRepositoryStub, 'add');

    await sut.add(accountData);

    await expect(add).toHaveBeenCalledWith({
      name: 'name',
      email: 'email@domain.com',
      password: 'hashedValue',
    });
  });

  test('Should throw if AddAccountRepository throws', async () => {
    jest.spyOn(addAccountRepositoryStub, 'add').mockRejectedValue(new Error());

    const promise = sut.add(accountData);

    await expect(promise).rejects.toThrow();
  });
});
