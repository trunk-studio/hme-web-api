export default {
  'port': 3000,
  'domain': 'localhost',
  'serialport':  process.env.SERIALPORT || '',
  'connection': {
    'database': 'hme',
    'username': process.env.MYSQL_USER || "root",
    'password': process.env.MYSQL_PASS || "root",
    'host': process.env.MYSQL_HOST || "localhost",
    'port': process.env.MYSQL_PORT || "3306",
    'dialect': 'mysql',
    'force': false
  },
  'configPath': './hme.txt'
};
