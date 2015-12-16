let SerialPort = require("serialport").SerialPort;

export default async (cb) => {

  let visitorUser = {
    "username":"visitor",
    "password":"visitor",
    "gender":"male",
    "email":"visitor@visitor.com",
    "phone":"(951)-385-6121",
    "cell":"(657)-919-3511"
  }


  let editorUser = {
    "username":"editor",
    "password":"editor",
    "gender":"male",
    "email":"editor@editor.com",
    "phone":"(951)-385-6121",
    "cell":"(657)-919-3511"
  }

  let adminUser = {
    "username":"admin",
    "password":"admin",
    "gender":"male",
    "email":"admin@admin.com",
    "phone":"(951)-385-6121",
    "cell":"(657)-919-3511"
  }




  try {
    let createdVisitor = await models.User.create(visitorUser);
    let createdEditor = await models.User.create(editorUser);
    let createdAdmin = await models.User.create(adminUser);

    console.log('=== process.env.SERIALPORT_OPEN ===', process.env.SERIALPORT_OPEN);

    let SERIALPORT = process.env.SERIALPORT;
    if(SERIALPORT != undefined){
      // var RestComm = [128,1,0,0,0,0,0,50,1,0,0,0,0,0,1,0,0,53,1,0]

      var serialPort = new SerialPort(SERIALPORT, {baudrate: 115200}, true);
      global.serialPort = serialPort;

      let openSerialPort = await new Promise((resolve, reject) => {
        serialPort.on ('open', function () {
          resolve(true)
        });
      });

      console.log('=== openSerialPort ===', openSerialPort);
    }

  } catch (e) {

    console.log("error", e);

  }
}
