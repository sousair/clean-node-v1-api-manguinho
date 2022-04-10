import { EmailValidator } from '../presentation/protocols/email-validator';
import { EmailValidatorAdapter } from './email-validator';

describe('EmailValidator Adapter', () => {
  let sut: EmailValidator;

  beforeEach(() => {
    sut = new EmailValidatorAdapter();
  });

  test('Should return false if validator returns false', () => {
    const isValid = sut.isValid('invalidEmail');

    expect(isValid).toBeFalsy();
  });
});
