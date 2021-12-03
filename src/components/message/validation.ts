import bcrypt = require('bcryptjs');
import { UserInputError, AuthenticationError } from 'apollo-server';
import { isEqual, flow } from 'lodash';

import { VALIDATION_ERRORS } from './constants';
import { BaseValidation } from '../../utils';

export class MessageValidation extends BaseValidation {
  constructor(data?) {
    super(data)
  }
}
