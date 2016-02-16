// button is attaced to pin 17, led to 18
var GPIO = require('onoff').Gpio,
    ledA = new GPIO(8, 'out'),
    buttonA = new GPIO(20, 'in', 'both');
    // ledB = new GPIO(8, 'out'),
    // buttonB = new GPIO(21, 'in', 'both');

var exec = require('child_process').exec;

// define the callback function
function lightA(err, state) {
  console.log('buttonA click', state);
  // check the state of the button
  // 1 == pressed, 0 == not pressed
  if(state == 1) {
    // turn LED on
    ledA.writeSync(0);

    var updateIniCmd = 'crudini --set --existing /root/hme-web-api/hme.txt SYSTEM SETTED false &&'+
    'crudini --set --existing /root/hme-web-api/hme.txt WIFI MODE AP';

    console.log('=== updateIniCmd ===', updateIniCmd);
    exec(updateIniCmd, function(error, stdout, stderr) {
      console.log(error);
      console.log(stdout);
      console.log(stderr);
    });

    var cmd = 'cd /root/hme-web-api/wifiConfig && make ap_mode && sudo /sbin/reboot';

    console.log('=== cmd ===', cmd);
    exec(cmd, function(error, stdout, stderr) {
      console.log(error);
      console.log(stdout);
      console.log(stderr);
      ledA.writeSync(0);
    });

  } else {
    // turn LED off
    ledA.writeSync(1);
  }
}

// function lightB(err, state) {
//   console.log('buttonB click', state);
//   // check the state of the button
//   // 1 == pressed, 0 == not pressed
//   if(state == 1) {
//     // turn LED on
//     var cmd = 'make ap_mode';
//
//     exec(cmd, function(error, stdout, stderr) {
//       console.log(stdout);
//       ledB.writeSync(0);
//     });
//     ledB.writeSync(0);
//   } else {
//     // turn LED off
//     ledB.writeSync(1);
//   }
// }


// pass the callback function to the
// as the first argument to watch()
console.log('ready');
buttonA.watch(lightA);
// buttonB.watch(lightB);
