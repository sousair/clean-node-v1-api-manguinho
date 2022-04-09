import { MissingParamError } from '../errors/missing-param-error';
import { InvalidParamError } from './../errors/invalid-param-error';
import { EmailValidator } from './../protocols/email-validator';
import { SignUpController } from './signup';

describe('SignUp Controller', () => {
  let sut: SignUpController;
  let emailValidatorStub: EmailValidator;

  beforeEach(() => {
    class EmailValidatorStub implements EmailValidator {
      isValid(email: string): boolean {
        return true;
      }
    }

    emailValidatorStub = new EmailValidatorStub();
    sut = new SignUpController(emailValidatorStub);
  });

  test('Should return 400 if no name is provided', () => {
    const httpRequest = {
      body: {
        email: 'email@domain.com',
        password: 'password',
        passwordConfirmation: 'password',
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toStrictEqual(new MissingParamError('name'));
  });

  test('Should return 400 if no email is provided', () => {
    const httpRequest = {
      body: {
        name: 'name',
        password: 'password',
        passwordConfirmation: 'password',
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toStrictEqual(new MissingParamError('email'));
  });

  test('Should return 400 if no password is provided', () => {
    const httpRequest = {
      body: {
        name: 'name',
        email: 'email@domain.com',
        passwordConfirmation: 'password',
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toStrictEqual(new MissingParamError('password'));
  });

  test('Should return 400 if no passwordConfirmation is provided', () => {
    const httpRequest = {
      body: {
        name: 'name',
        email: 'email@domain.com',
        password: 'password',
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toStrictEqual(
      new MissingParamError('passwordConfirmation'),
    );
  });

  test('Should return 400 if an invalid email is provided', () => {
    const httpRequest = {
      body: {
        name: 'name',
        email: 'invalidEmail@domain.com',
        password: 'password',
        passwordConfirmation: 'password',
      },
    };

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toStrictEqual(new InvalidParamError('email'));
  });

  test('Should call emailValidator with correct email', () => {
    const httpRequest = {
      body: {
        name: 'name',
        email: 'email@domain.com',
        password: 'password',
        passwordConfirmation: 'password',
      },
    };

    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');

    sut.handle(httpRequest);

    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email);
  });
});
