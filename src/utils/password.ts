import { createHmac } from 'crypto';

/**
 * Hashes first value and then checks if it's the same with second one.
 *
 * @param {string} password1
 * @param {string} password2
 * @return {boolean} boolean
 */
const doPasswordsMatch = (password1: string, password2: string): boolean => {
  return (
    createHmac('sha256', process.env.JWT_SECRET)
      .update(password1)
      .digest('hex') === password2
  );
};

const hashPassword = (password: string): string => {
  return createHmac('sha256', process.env.JWT_SECRET)
    .update(password)
    .digest('hex');
};

export { doPasswordsMatch, hashPassword };
