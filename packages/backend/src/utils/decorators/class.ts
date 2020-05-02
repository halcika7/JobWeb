import { RouterOptions } from 'express';
import { ClassKeys } from './constants/enums';

export { injectable as Injectable } from 'tsyringe';

// Class Decorator
function classHelper<T>(metadataKey: ClassKeys, metadataValue: T) {
  return <TFunction extends Function>(target: TFunction) => {
    Reflect.defineMetadata(metadataKey, metadataValue, target.prototype);
    return target;
  };
}

export function Controller(path: string): ClassDecorator {
  return classHelper(ClassKeys.BASE_PATH, `/${path}`);
}

export function ClassOptions(options: RouterOptions): ClassDecorator {
  return classHelper(ClassKeys.OPTIONS, options);
}
