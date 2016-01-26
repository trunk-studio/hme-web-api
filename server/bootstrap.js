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
    if(appConfig.environment === 'test' || appConfig.environment === 'development'){
      sinon.stub(services.deviceControl, 'getAllSlaveDeviceList', () => {
        let result = [{
          slaveId: 1,
          deviceList:[{
      			"id": 1,
      			"uid": 34895,
          },{
      			"id": 2,
      			"uid": 49575,
          }]
        },{
          slaveId: 2,
          deviceList:[{
      			"id": 3,
      			"uid": 25673,
          },{
      			"id": 4,
      			"uid": 49576,
          }]
        }];
        return result;
      });
    }
    let createdVisitor = await models.User.create(visitorUser);
    let createdEditor = await models.User.create(editorUser);
    let createdAdmin = await models.User.create(adminUser);
    let connected = await services.hme.connectSerialPort();

    await services.hme.pingAllSlave();
    // without await to reduce bootstrap waiting time
    if(connected)
      await services.deviceControl.syncDevice();
    // search slave
  } catch (e) {

    console.log("error", e);

  }
}
