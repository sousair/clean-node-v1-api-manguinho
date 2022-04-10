import { EmailValidator } from '../presentation/protocols/email-validator';
import { EmailValidatorAdapter } from './email-validator';
import validator from 'validator';

describe('EmailValidator Adapter', () => {
  let sut: EmailValidator;

  beforeEach(() => {
    sut = new EmailValidatorAdapter();
  });

  test('Should return false if validator returns false', () => {
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);

    const isValid = sut.isValid('invalidEmail@domain.com');

    expect(isValid).toBeFalsy();
  });

  test('Should return true if validator returns true', () => {
    const isValid = sut.isValid('validEmail@domain.com');

    expect(isValid).toBeTruthy();
  });
});
