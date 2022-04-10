import { MongoHelper } from '../helpers/mongo-helper';
import { AccountMongoRepository } from './account';

describe('Account Mongo Repository', () => {
  const accountData = {
    name: 'validName',
    email: 'validEmail@domain.com',
    password: 'validHashedPassword',
  };

  let mongoHelper: MongoHelper;
  let sut: AccountMongoRepository;

  beforeAll(async () => {
    mongoHelper = new MongoHelper();
    await mongoHelper.connect(process.env.MONGO_URL || '');
  });

  afterAll(async () => {
    await mongoHelper.disconnect();
  });

  beforeEach(async () => {
    await mongoHelper.getCollection('accounts').deleteMany({});
    sut = new AccountMongoRepository(mongoHelper);
  });

  test('Should return an account on success', async () => {
    const account = await sut.add(accountData);

    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe(accountData.name);
    expect(account.email).toBe(accountData.email);
    expect(account.password).toBe(accountData.password);
  });
});
