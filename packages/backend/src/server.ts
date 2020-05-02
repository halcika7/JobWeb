import 'reflect-metadata';
import './utils/moduleAlias';

import App from './app';

const server = new App();

server.start();

export default server;
