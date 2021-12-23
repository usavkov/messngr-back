import { AuthenticationError } from 'apollo-server-errors';
import * as bcrypt from 'bcryptjs';
import { ValidationError, ValidationOptions } from 'class-validator';
import { isEqual } from 'lodash';

import { CONFIRM_PASSWORD_MISMATCH, WRONG_PASSWORD } from '../../constants';
import { VALIDATION_ERRORS } from './constants';

const getValidationError = (options: ValidationOptions) => {
  const error = new ValidationError()

  return Object.entries(options).reduce((acc, [key, value]) => {
    acc[key] = value;

    return acc;
  }, error);
}

export const validationFlow = (...fns) => (data) => (
  fns.reduce((acc, curr) => {
    acc = [ ...acc, curr(data) ]

    return acc;
    }, []).filter(Boolean)
)

export const isConfirmPasswordMatches = ({ password, confirmPassword }) => (
  isEqual(password, confirmPassword)
    ? null
    : getValidationError({
        message: 'Passwords mismatch',
        context: {
          code: CONFIRM_PASSWORD_MISMATCH,
          readable: 'Passwords must match'
        }
      })
)

export const isPasswordCorrect = async (fromInput, fromDB) => {
  const isMatch = await bcrypt.compare(fromInput, fromDB);

  return isMatch
    ? null
    : getValidationError({
      message: 'Wrong password',
      context: {
        code: WRONG_PASSWORD,
        readable: 'Passwords must match'
      }
    })
}

export const isAuthorized = ({ isAuthorized }) => {
  if (!isAuthorized) throw new AuthenticationError(VALIDATION_ERRORS.unauthorized)
};
