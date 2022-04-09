import { InvalidParamError, MissingParamError } from '../../errors';
import { badRequest, serverError } from '../../helpers/http-helpers';
import {
  AddAccount,
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse,
} from './signup-protocols';

export class SignUpController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount,
  ) {}

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredField = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ];

      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const { name, email, password, passwordConfirmation } = httpRequest.body;

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }

      if (!this.emailValidator.isValid(email)) {
        return badRequest(new InvalidParamError('email'));
      }

      const account = this.addAccount.add({ name, email, password });

      return {
        statusCode: 200,
        body: account,
      };
    } catch (error) {
      return serverError();
    }
  }
}
