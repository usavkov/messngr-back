import { UserInputError } from 'apollo-server-express';
import { flow } from 'lodash';

const VALIDATION_ERRORS = {
  emptyField: 'Cannot be empty',
};

type ValidationData = any;

export class BaseValidation {
  protected _data: ValidationData;
  constructor(data?: ValidationData) {
    this._data = data;
  }

  errors = [];

  isEmpty(data: any, error?: any): any {
    flow(
      Boolean,
      this.throwError(error || new UserInputError(VALIDATION_ERRORS.emptyField))
    )(data.length);

    return this;
  }

  addError(error) {
    return (isValid) => {
      if (!isValid) {
        this.errors = [...this.errors, error];
      }
    };
  }

  throwError(
    error = new UserInputError('Validation error', { errors: this.errors })
  ) {
    return (isValid) => {
      if (!isValid) throw error;
    };
  }

  async completeValidation() {
    this.throwError()(!this.errors.length);

    return this._data;
  }
}
