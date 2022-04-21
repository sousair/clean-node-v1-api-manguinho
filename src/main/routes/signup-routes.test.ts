import request from 'supertest';
import { MongoHelper } from '../../infra/database/mongodb/helpers/mongo-helper';
import app from '../config/app';

describe('SignUp Routes', () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = new MongoHelper();
    await mongoHelper.connect(process.env.MONGO_URL || '');
  });

  afterAll(async () => {
    await mongoHelper.disconnect();
  });

  beforeEach(async () => {
    await mongoHelper.getCollection('accounts').deleteMany({});
  });

  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'anyName',
        email: 'anyEmail',
        password: 'anyPassword',
        passwordConfirmation: 'anyPassword',
      })
      .expect(200);
  });
});
