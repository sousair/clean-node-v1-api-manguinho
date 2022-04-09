import { SignUpController } from './signup';

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        // name: 'name',
        email: 'email@domain.com',
        password: 'password',
        passwordConfirmation: 'password',
      },
    };
    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
  });
});