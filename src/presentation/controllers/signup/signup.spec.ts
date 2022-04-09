import {
  AddAccount,
  AddAccountModel,
  AccountModel,
  EmailValidator,
} from './signup-protocols';
import {
  InvalidParamError,
  MissingParamError,
  ServerError,
} from '../../errors';
import { SignUpController } from './signup';

describe('SignUp Controller', () => {
  let sut: SignUpController;
  let emailValidatorStub: EmailValidator;
  let addAccountStub: AddAccount;

  beforeEach(() => {
    class EmailValidatorStub implements EmailValidator {
      isValid(email: string): boolean {
        return true;
      }
    }

    class AddAccountStub implements AddAccount {
      async add(account: AddAccountModel): Promise<AccountModel> {
        const fakeAccount = {
          id: 'validId',
          name: 'validName',
          email: 'validEmail@domain.com',
          password: 'validPassword',
        };
        return Promise.resolve(fakeAccount);
      }
    }

    emailValidatorStub = new EmailValidatorStub();
    addAccountStub = new AddAccountStub();
    sut = new SignUpController(emailValidatorStub, addAccountStub);
  });

  test('Should return 400 if no name is provided', async () => {
    const httpRequest = {
      body: {
        email: 'email@domain.com',
        password: 'password',
        passwordConfirmation: 'password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toStrictEqual(new MissingParamError('name'));
  });

  test('Should return 400 if no email is provided', async () => {
    const httpRequest = {
      body: {
        name: 'name',
        password: 'password',
        passwordConfirmation: 'password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toStrictEqual(new MissingParamError('email'));
  });

  test('Should return 400 if no password is provided', async () => {
    const httpRequest = {
      body: {
        name: 'name',
        email: 'email@domain.com',
        passwordConfirmation: 'password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toStrictEqual(new MissingParamError('password'));
  });

  test('Should return 400 if no passwordConfirmation is provided', async () => {
    const httpRequest = {
      body: {
        name: 'name',
        email: 'email@domain.com',
        password: 'password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toStrictEqual(
      new MissingParamError('passwordConfirmation'),
    );
  });

  test('Should return 400 if no password confirmation fails', async () => {
    const httpRequest = {
      body: {
        name: 'name',
        email: 'email@domain.com',
        password: 'password',
        passwordConfirmation: 'otherPassword',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toStrictEqual(
      new InvalidParamError('passwordConfirmation'),
    );
  });

  test('Should return 400 if an invalid email is provided', async () => {
    const httpRequest = {
      body: {
        name: 'name',
        email: 'invalidEmail@domain.com',
        password: 'password',
        passwordConfirmation: 'password',
      },
    };

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toStrictEqual(new InvalidParamError('email'));
  });

  test('Should call EmailValidator with correct email', async () => {
    const httpRequest = {
      body: {
        name: 'name',
        email: 'email@domain.com',
        password: 'password',
        passwordConfirmation: 'password',
      },
    };

    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');

    await sut.handle(httpRequest);

    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email);
  });

  test('Should return 500 if EmailValidator throws', async () => {
    const httpRequest = {
      body: {
        name: 'name',
        email: 'email@domain.com',
        password: 'password',
        passwordConfirmation: 'password',
      },
    };

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toStrictEqual(new ServerError());
  });

  test('Should call AddAccount with correct values', async () => {
    const httpRequest = {
      body: {
        name: 'name',
        email: 'email@domain.com',
        password: 'password',
        passwordConfirmation: 'password',
      },
    };

    const addSpy = jest.spyOn(addAccountStub, 'add');

    await sut.handle(httpRequest);

    expect(addSpy).toHaveBeenCalledWith({
      name: httpRequest.body.name,
      email: httpRequest.body.email,
      password: httpRequest.body.password,
    });
  });

  test('Should return 500 if AddAccount throws', async () => {
    const httpRequest = {
      body: {
        name: 'name',
        email: 'email@domain.com',
        password: 'password',
        passwordConfirmation: 'password',
      },
    };

    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return Promise.reject(new Error());
    });

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toStrictEqual(new ServerError());
  });

  test('Should return 200 if valid data is provided', async () => {
    const httpRequest = {
      body: {
        name: 'name',
        email: 'email@domain.com',
        password: 'password',
        passwordConfirmation: 'password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toStrictEqual({
      id: 'validId',
      name: 'validName',
      email: 'validEmail@domain.com',
      password: 'validPassword',
    });
  });
});
