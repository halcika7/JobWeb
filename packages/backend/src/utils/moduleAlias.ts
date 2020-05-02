import moduleAlias from 'module-alias';
import { resolve } from 'path';
import { Configuration } from '../configs';

const mode = Configuration.appConfig.environment;

const startDirectory = mode === 'production' ? '/dist' : '/src';

const rootdirectory = resolve(__dirname, '../../');

// Or multiple aliases
moduleAlias.addAliases({
  '@env': `${rootdirectory}${startDirectory}/configs/index`,
  '@config': `${rootdirectory}${startDirectory}/configs`,
  '@controller': `${rootdirectory}${startDirectory}/controllers`,
  '@middleware': `${rootdirectory}${startDirectory}/middlewares`,
  '@model': `${rootdirectory}${startDirectory}/models`,
  '@service': `${rootdirectory}${startDirectory}/services`,
  '@logger': `${rootdirectory}${startDirectory}/utils/logger/index`,
  '@ctypes': `${rootdirectory}${startDirectory}/utils/types/index`,
  '@model-validator': `${rootdirectory}${startDirectory}/utils/CustomClassValidator/index`,
  '@decorator': `${rootdirectory}${startDirectory}/utils/decorators`,
});

moduleAlias();
