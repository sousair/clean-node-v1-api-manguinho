import bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypt-adapter';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return Promise.resolve('hashedValue');
  },
}));

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

  it('Should return a hash on success', async () => {
    const hashedValue = await sut.encrypt(valueToHash);

    expect(hashedValue).toBe('hashedValue');
  });

  it('Should throws if bcrypt throws', async () => {
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.encrypt(valueToHash);

    await expect(promise).rejects.toThrow();
  });
});
