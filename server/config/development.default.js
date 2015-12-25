export default {
  'port': 3000,
  'domain': 'localhost',
  'connection': {
    'database': 'hme',
    'username': process.env.MYSQL_ENV_MYSQL_USER_NAME || "root",
    'password': process.env.MYSQL_ENV_MYSQL_ADMIN_PASS || "root",
    'host': process.env.MYSQL_PORT_3306_TCP_ADDR || "localhost",
    'dialect': 'mysql',
    'force': false
  }
};
