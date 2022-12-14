import { EmailValidatorAdapter } from './email-validator-adapter';
import validator from 'validator';

describe('EmailValidator Adapter', () => {
  let sut: EmailValidatorAdapter;

  beforeEach(() => {
    sut = new EmailValidatorAdapter();
  });

  test('Should call validator with correct email', () => {
    const isEmailSpy = jest.spyOn(validator, 'isEmail');

    sut.isValid('email@domain.com');

    expect(isEmailSpy).toHaveBeenCalledWith('email@domain.com');
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
