export function checkIfStringEmpty(value: string | any): boolean {
  return typeof value === 'string' && value.trim().length === 0;
}

export function checkIfObjectEmpty(value: object | any): boolean {
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
