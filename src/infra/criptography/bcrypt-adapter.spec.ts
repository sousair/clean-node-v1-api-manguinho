import bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypt-adapter';

describe('Bcrypt Adapter', () => {
  let sut: BcryptAdapter;

  const valueToHash = 'anyValue';
  const salt = 12;

  beforeEach(() => {
    sut = new BcryptAdapter(salt);
  });

  it('Should call bcrypt with correct values', async () => {
    const hash = jest.spyOn(bcrypt, 'hash');

    await sut.encrypt(valueToHash);

    expect(hash).toBeCalledWith(valueToHash, salt);
  });
});
