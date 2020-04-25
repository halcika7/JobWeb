import moduleAlias from 'module-alias';
import path from 'path';
import { Configuration } from '../config/AppConfig';

const mode = Configuration.appConfig.environment;

const startDirectory = mode === 'production' ? '/dist' : '/src';

const rootdirectory = path.resolve(__dirname, '../../');
// Or multiple aliases
moduleAlias.addAliases({
  '@config': `${rootdirectory}${startDirectory}/config`,
  '@controller': `${rootdirectory}${startDirectory}/controller`,
  '@middleware': `${rootdirectory}${startDirectory}/middleware`,
  '@model': `${rootdirectory}${startDirectory}/model`,
  '@route': `${rootdirectory}${startDirectory}/routes`,
  '@router': `${rootdirectory}${startDirectory}/routes/index`,
  '@service': `${rootdirectory}${startDirectory}/service`,
  '@logger': `${rootdirectory}${startDirectory}/util/logger/index`,
  '@ctypes': `${rootdirectory}${startDirectory}/util/types/index`,
  '@validation': `${rootdirectory}${startDirectory}/util/validation`,
});

// moduleAlias.addPath(`${__dirname}${startDirectory}`);

moduleAlias();
