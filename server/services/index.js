

import HmeService from './hme';
import schedule from './schedule';
import deviceControl from './deviceControl';
import LoggerService from './logger';
import MailService from './mail';
import SystemService from './system';
import Hmegpio from "./hmegpio";

export default class Services {

    constructor () {
      this.hme = new HmeService(appConfig.serialport);
      this.schedule = schedule
      this.deviceControl = deviceControl;
      this.logger = new LoggerService();
      this.mail = new MailService();
      this.system = new SystemService();
      this.hmegpio = new Hmegpio();

      global.logger = this.logger;

    }

}
