import {
  AddAccount,
  Encrypter,
  AddAccountModel,
  AccountModel,
  AddAccountRepository,
} from './db-add-account-protocols';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository,
  ) {}

  async add({ name, email, password }: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(password);

    return this.addAccountRepository.add({
      name,
      email,
      password: hashedPassword,
    });
  }
}
