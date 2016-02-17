import {Gpio} from 'onoff';

export default class LedGpio {
  constructor (serialPortName) {
    this.led = require('onoff').GPIO(8, 'out');
    this.inv = null;
  }

  async blink() {
    try {
      let ledInterval = setInterval(function(){
        this.ledA.writeSync(this.ledA.readSync() === 0 ? 1 : 0)
      }, 100);
      // console.log('!!!!!!!!!');
    } catch (e) {
      throw e;
    }
  };

  async close() {
    try {
      if(this.inv){
        clearInterval(this.inv);
        this.ledA.writeSync(0);
      }
      // console.log("????????");
    } catch (e) {
      throw e;
    }
  };
};
