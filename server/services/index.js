

import HmeService from './hme';


export default class Services {

    constructor () {
      this.hme = new HmeService(process.env.SERIALPORT);
    }

}
