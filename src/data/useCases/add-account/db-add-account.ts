import {
  AddAccount,
  Encrypter,
  AddAccountModel,
  AccountModel,
} from './db-add-account-protocols';

export class DbAddAccount implements AddAccount {
  constructor(private readonly encrypter: Encrypter) {}

  async add({ name, email, password }: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(password);

    return {
      id: '',
      name: '',
      email: '',
      password: hashedPassword,
    };
  }
}
