/* eslint-disable import/prefer-default-export */
export const countPassedValidators = (validatorFunctionsArray, password) => validatorFunctionsArray
  .reduce((passedValidators, validatorFunction) => {
    if (passedValidators === 2) {
      return passedValidators;
    }
    return passedValidators + Number(!!validatorFunction(password));
  }, 0);
