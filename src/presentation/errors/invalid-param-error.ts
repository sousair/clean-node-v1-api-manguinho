export class InvalidParamError extends Error {
  constructor(invalidParam) {
    super(`Invalid param: ${invalidParam}`);
    this.name = 'InvalidParamError';
  }
}
