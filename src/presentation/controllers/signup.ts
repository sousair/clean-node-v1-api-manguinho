import { MissingParamError } from '../errors/missing-param-error';
import { BadRequest } from '../helpers/http-helpers';
import { HttpRequest, HttpResponse } from './../protocols/http';

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredField = ['name', 'email'];

    for (const field of requiredField) {
      if (!httpRequest.body[field]) {
        return BadRequest(new MissingParamError(field));
      }
    }

    return {
      statusCode: 200,
      body: '',
    };
  }
}
