import { AccountModel } from '../../../../domain/models/account';
import { AddAccountModel } from '../../../../domain/useCases/add-account';
import { MongoHelper } from '../helpers/mongo-helper';
import { AddAccountRepository } from './../../../../data/protocols/add-account-repository';

export class AccountMongoRepository implements AddAccountRepository {
  constructor(private readonly mongoHelper: MongoHelper) {}

  async add(account: AddAccountModel): Promise<AccountModel> {
    const accountCollection = this.mongoHelper.getCollection('accounts');

    const { insertedId: insertedAccountMongoId } = await accountCollection.insertOne(account);

    const accountFromDb = await accountCollection.findOne(insertedAccountMongoId);

    if (!accountFromDb) throw new Error();

    return {
      id: accountFromDb._id.toString(),
      name: accountFromDb.name,
      email: accountFromDb.email,
      password: accountFromDb.password,
    };
  }
}
