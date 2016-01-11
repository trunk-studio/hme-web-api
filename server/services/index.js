

import HmeService from './hme';
import schedule from './schedule';


export default class Services {

    constructor () {
      this.hme = new HmeService(appConfig.serialport);
      this.schedule = schedule;
    }

}
