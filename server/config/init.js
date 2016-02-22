import debug from 'debug';
import md5 from 'md5'
const env = process.env.NODE_ENV || 'development';
let config;

try {
  config = require(`./${env}`);
  console.log(config);
  config.default.environment = env;
  config.default.userData = {
    admin: md5('admin'),
    engineer: md5('engineer'),
    user: md5('user')
  };
  config.default.secret = 'supersecret';
}
catch (error) {
  debug('dev')(`No specific configuration for env ${env}`);
}

export default config.default;
