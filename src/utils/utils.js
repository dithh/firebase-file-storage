/* eslint-disable import/prefer-default-export */
export const countPassedValidators = (validatorFunctionsArray, password) => validatorFunctionsArray
  .reduce((passedValidators, validatorFunction) => {
    if (passedValidators === 2) {
      return passedValidators;
    }
    return passedValidators + Number(!!validatorFunction(password));
  }, 0);

/* eslint-disable import/prefer-default-export */
export const createLink = (fileName, blob) => {
  const link = document.createElement('a');
  link.setAttribute('download', fileName);
  link.setAttribute('target', '_blank');
  link.href = URL.createObjectURL(blob);
  return link;
};
