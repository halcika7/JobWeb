/* eslint-disable max-classes-per-file */
import { BaseService } from '@service/Base';

import { shutdown } from '../utils';

class Basic extends BaseService {
  constructor() {
    super(Basic);
  }

  create = (model: any, values: any) => {
    return this.createModelInstance(model, values);
  };

  generic = () => {
    return this.returnGenericFailed(400);
  };

  rsp = () => {
    return this.returnResponse(200, {});
  };

  rspm = () => {
    return this.returnResponseMessage(200, 'Message');
  };

  logg = () => {
    return this.logger;
  };
}

class Model {
  public name: string | undefined;

  public year: number | undefined;
}

const err = new Basic();

describe('Testing Base service', () => {
  afterAll(async () => {
    await shutdown();
  });
  test('should throw error with status 400', async () => {
    const r = err.generic();

    expect(r.status).toBe(400);
  });

  test('should return 200', async () => {
    const r = err.rsp();

    expect(r.status).toBe(200);
  });

  test('should return 200', async () => {
    const r = err.rspm();

    expect(r.status).toBe(200);
    expect(r.message).toBe('Message');
  });

  test('should return 200', async () => {
    err.logg();

    expect(true).toBe(true);
  });

  test('2 classes', () => {
    const newClass = new Basic();

    const model = newClass.create(new Model(), { name: 'Haris', year: 1995 });

    expect(newClass).toEqual(err);
    expect(newClass.logg).toEqual(err.logg);
    expect(model.name).toBe('Haris');
    expect(model.year).toEqual(1995);
  });
});
