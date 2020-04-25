import 'reflect-metadata';
import './util/moduleAlias';

import app from './app';

import { LoggerFactory } from '@logger';

const logger = LoggerFactory.getLogger('Server');

const server = app.listen(app.get('port'), () => {
  logger.info(
    `App is running at http://localhost:${app.get('port')} in ${app.get(
      'env'
    )} mode.`,
    'server-connection'
  );
});

export default server;
