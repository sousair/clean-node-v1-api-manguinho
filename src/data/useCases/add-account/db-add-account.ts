import { Encrypter } from './../../protocols/encrypter';
import { AccountModel } from '../../../domain/models/account';
import {
  AddAccount,
  AddAccountModel,
} from './../../../domain/useCases/add-account';

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
