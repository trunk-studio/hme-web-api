

import HmeService from './hme';
import schedule from './schedule';
import deviceControl from './deviceControl';


export default class Services {

    constructor () {
      this.hme = new HmeService(process.env.SERIALPORT);
      this.schedule = schedule
      this.deviceControl = deviceControl;
    }

}
