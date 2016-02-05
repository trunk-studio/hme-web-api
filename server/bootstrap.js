import request from 'superagent'
import ini from 'ini'

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

    // without await to reduce bootstrap waiting time
    // if(connected){
    //  await services.deviceControl.syncDevice();
    // }

    let slave1,slave2,s1d1,s1d2,s2d1,s2d2;
    slave1 = await models.Slave.create({
      host: "127.0.0.1",
      description: "描述",
      apiVersion: "0.1.0",
    });
    slave2 = await models.Slave.create({
      host: "127.0.0.1",
      description: "描述",
      apiVersion: "0.1.2",
    });
    s1d1 = await models.Device.create({
      uid: 34895,
      SlaveId: slave1.id
    });
    s1d2 = await models.Device.create({
      uid: 49575,
      SlaveId: slave1.id
    });
    s2d1 = await models.Device.create({
      uid: 25673,
      SlaveId: slave2.id
    });
    s2d2 = await models.Device.create({
      uid: 49576,
      SlaveId: slave2.id
    });

    // await services.hme.pingAllSlave();
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

  } catch (e) {

    console.log("error", e);

  }
}
