import { InvalidParamError } from './../errors/invalid-param-error';
import { EmailValidator } from './../protocols/email-validator';
import { MissingParamError } from '../errors/missing-param-error';
import { BadRequest } from '../helpers/http-helpers';
import { Controller } from './../protocols/controller';
import { HttpRequest, HttpResponse } from './../protocols/http';

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredField = ['name', 'email', 'password', 'passwordConfirmation'];

    for (const field of requiredField) {
      if (!httpRequest.body[field]) {
        return BadRequest(new MissingParamError(field));
      }
    }

    if (!this.emailValidator.isValid(httpRequest.body.email)) {
      return BadRequest(new InvalidParamError('email'));
    }

    return {
      statusCode: 200,
      body: '',
    };
  }
}
