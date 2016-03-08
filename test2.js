
// pin23 = I/O Switching, pin18 = pulse output
var GPIO = require('onoff').Gpio,
    swPin = new GPIO(23, 'low'),
    pulsePin = new GPIO(18, 'high');




  (function() {
    // setInterval(function () {
    //   pulseMs(5);
    //   clearInterval(itd);
    // }, 30)
    setTimeout(function () {
      pulseMs(5);
    }, 100);

  })();



function pulseMs(ms) {
  swPin.writeSync(0);
  pulsePin.writeSync(1);
  swPin.writeSync(1);
  pulsePin.writeSync(0);
  setTimeout(function () {
    pulsePin.writeSync(1);
    swPin.writeSync(0);
  }, ms);

 }
