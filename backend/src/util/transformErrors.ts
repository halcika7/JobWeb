import { validate } from 'class-validator';
import stringEscape from 'js-string-escape';

export const transformErrors = async (Model, additionalObj: object = {}) => {
  const r = await validate(Model, additionalObj);
  let errors: { [key: string]: string } = {};

  r.forEach(({ property, constraints }) => {
    errors = {
      ...errors,
      [property]: Object.values(constraints)[0],
    };
  });

  return errors;
};

export function createNewdBRow(
  Model,
  values: { [key: string]: string | number | boolean }
) {
  let obj = new Model();

  Object.keys(values).forEach(key => {
    // eslint-disable-next-line security/detect-object-injection
    const escaped = stringEscape(values[key]);
    obj = {
      ...obj,
      [key]: escaped,
    };
  });

  return obj;
}

function checkIfStringEmpty(value): boolean {
  return typeof value === 'string' && value.trim().length === 0;
}

function checkIfObjectEmpty(value): boolean {
  return typeof value === 'object' && Object.keys(value).length === 0;
}

export function isEmpty(value: undefined | null | string | object): boolean {
  return (
    value === undefined ||
    value === null ||
    checkIfObjectEmpty(value) ||
    checkIfStringEmpty(value)
  );
}
