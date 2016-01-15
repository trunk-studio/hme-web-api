import debug from 'debug';

const env = process.env.NODE_ENV || 'development';
let config;

try {
  config = require(`./${env}`);
  console.log('=== config ===', config);
  config.environment = env;
}
catch (error) {
  debug('dev')(`No specific configuration for env ${env}`);
}

export default config.default;
