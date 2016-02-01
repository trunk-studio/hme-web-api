import debug from 'debug';


export default class Logger {
  constructor () {
    let {environment} = appConfig

    if (environment !== 'production') {
      debug.enable('dev, info, error');
    } else {
      debug.enable('info, error');
    }

    this.debug = debug;
  }

  async error({error}){

    let message = {
      title: error.message,
      content: error.stack,
      type: 'error'
    }

    await models.Message.create(message);
    this.debug('error')(error);
  };

  async info({info}){

    let message = {
      title: info,
      type: 'info'
    }

    await models.Message.create(message);
    this.debug('info')(info);
  };

  dev({dev}){
    this.debug('dev')(dev);
  };

}
