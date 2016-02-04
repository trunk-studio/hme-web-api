export default {
  'port': 3001,
  'serialport':  process.env.SERIALPORT || '',
  'connection': {
    'dialect': 'sqlite',
    'storage': './db.development.sqlite',
    'username': null,
    'password': null,
    'database': null,
    'force': true
  },
  'configPath': './hme.txt'
};
