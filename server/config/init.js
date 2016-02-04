import debug from 'debug';
import md5 from 'md5'
const env = process.env.NODE_ENV || 'development';
let config;

try {
  config = require(`./${env}`);
  config.environment = env;
  config.userData = {
    admin: md5('admin'),
    engineer: md5('engineer'),
    user: md5('user')
  };
  config.secret = 'supersecret';
}
catch (error) {
  debug('dev')(`No specific configuration for env ${env}`);
}

export default config;
