var GPIO = require('onoff').Gpio;
var swPin = new GPIO(23, 'low');
var pulsePin = new GPIO(18, 'high');


export default class Hmegpio {

  sleep(ms = 0){
    return new Promise(r => setTimeout(r, ms));
  };

  async gpioPulse (ms)  {
    try {
      swPin.writeSync(0);
      pulsePin.writeSync(1);
      swPin.writeSync(1);
      // await this.sleep(1);
      pulsePin.writeSync(0);
      await this.sleep(ms);
      swPin.writeSync(0);
      pulsePin.writeSync(1);

    } catch (e) {
      throw e;
    }
  };
}
