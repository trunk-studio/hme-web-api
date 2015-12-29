

import HmeService from './hme';
import schedule from './schedule';


export default class Services {

    constructor () {
      this.hme = new HmeService(process.env.SERIALPORT);
      this.schedule = schedule;
    }

}
