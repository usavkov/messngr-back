import bcrypt = require('bcryptjs');
import { UserInputError, AuthenticationError } from 'apollo-server-express';
import { isEqual, flow } from 'lodash';

import { VALIDATION_ERRORS } from './constants';
import { BaseValidation } from '../../utils';

const { confirmPasswordMismatch, wrongCredentials, userNotFound } =
  VALIDATION_ERRORS;

export class UserValidation extends BaseValidation {
  constructor(data?) {
    super(data)
  }

  // SignUp
  isConfirmPasswordMatches() {
    const { password, confirmPassword } = this._data;

    flow(
      isEqual,
      this.addError({ message: confirmPasswordMismatch }),
    )(password, confirmPassword);

    return this;
  }

  // Login
  isUserExist() {
    flow(
      Boolean,
      this.throwError(new AuthenticationError(userNotFound)),
    )(this._data);

    return this;
  }

  async isPasswordCorrect(password) {
    await bcrypt
      .compare(password, this._data.password)
      .then(this.throwError(new AuthenticationError(wrongCredentials)));
    
    return this;
  }

  authenticate(isAuthorized) {
    this.throwError(new AuthenticationError(VALIDATION_ERRORS.unauthorized))(Boolean(isAuthorized))

    return this
  }
}
