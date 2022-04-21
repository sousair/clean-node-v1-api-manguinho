import { MongoHelper } from './../../infra/database/mongodb/helpers/mongo-helper';
import { AccountMongoRepository } from './../../infra/database/mongodb/account-repository/account';
import { DbAddAccount } from '../../data/useCases/add-account/db-add-account';
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter';
import { SignUpController } from '../../presentation/controllers/signup/signup';
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter';

export const makeSignUpController = (): SignUpController => {
  const salt = 12;
  const emailValidator = new EmailValidatorAdapter();
  const bcryptAdapter = new BcryptAdapter(salt);
  const mongoHelper = new MongoHelper();
  const accountMongoRepository = new AccountMongoRepository(mongoHelper);
  const addAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository);
  return new SignUpController(emailValidator, addAccount);
};
