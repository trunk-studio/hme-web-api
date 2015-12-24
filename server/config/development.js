// export default {
//   port: parseInt(process.env.PORT, 10) || 3000,
//   'connection': {
//     'dialect': 'sqlite',
//     'storage': './db.development.sqlite',
//     'username': null,
//     'password': null,
//     'database': null,
//     'force': true
//   }
// };
export default {
  'port': 3000,
  'domain': 'localhost',
  'connection': {
    'username': 'root',
    'password': '123456',
    'database': 'hme',
    'host': '127.0.0.1',
    'dialect': 'mysql',
    'force': false
  }
};
