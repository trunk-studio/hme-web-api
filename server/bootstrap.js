import request from 'superagent'
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
    let connected = await services.hme.connectSerialPort();

    fs.ensureFile('./email', function (err) {
      if(err)
        throw new Error('create email file error');
    })

    // await services.hme.pingAllSlave();
    // without await to reduce bootstrap waiting time
    // if(connected){
      // await services.deviceControl.syncDevice();
    // let slaveList = await models.Slave.findAll();
    // for (let slave of slaveList) {
    //   try {
    //     let result = await new Promise((resolve, reject) => {
    //       request.get(`http://${slave.host}:3000/rest/slave/${slave.id}/searchDevice`).end((err, res) => {
    //         if(err) return reject(err);
    //         resolve(res.body);
    //       });
    //     });
    //     console.log(result.body);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
    // }

    // search slave
  } catch (e) {

    console.log("error", e);

  }
}
