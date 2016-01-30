import debug from 'debug';


export default class Logger {
  constructor () {
    let {environment} = appConfig

    if (environment !== 'production') {
      debug.enable('debug, info, error');
    } else {
      debug.enable('info, error');
    }

    this.debug = debug;


  }

  error({error}){
    debug('error')(error);
  };
}
