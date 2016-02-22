import debug from 'debug';
import md5 from 'md5'
const env = process.env.NODE_ENV || 'development';
let config;

try {
  config = require(`./${env}`);
  console.log(config);
  config.default.environment = env;
  config.default.userData = {
    administrator: md5('administrator'),
    engineer: md5('engineer'),
    operator: md5('operator')
  };
  config.default.secret = 'supersecret';
}
catch (error) {
  debug('dev')(`No specific configuration for env ${env}`);
}

export default config.default;
