

import HmeService from './hme';
import schedule from './schedule';
import deviceControl from './deviceControl';
import LoggerService from './logger';
import MailService from './mail';
import SystemService from './system';

export default class Services {

    constructor () {

      this.hme = new HmeService(appConfig.serialport);
      this.schedule = schedule
      this.deviceControl = deviceControl;
      this.logger = new LoggerService();
      this.mail = new MailService();
      this.system = new SystemService();

      global.logger = this.logger;

    }

}
