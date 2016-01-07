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
    let env =  process.env.NODE_ENV || 'development';
    if (env === 'development' || env === 'test') {
      let group = await models.Group.create();
      let group2 = await models.Group.create();
      sinon.stub(services.hme, 'SearchDevice', () => {
        let result = [
          {
            DevID: 8,
            GroupID: group.id
          },{
            DevID: 5,
            GroupID: group.id
          },{
            DevID: 7,
            GroupID: group2.id
          }
        ];
        return result;
      });
    }

    let createdVisitor = await models.User.create(visitorUser);
    let createdEditor = await models.User.create(editorUser);
    let createdAdmin = await models.User.create(adminUser);
    await services.hme.connectSerialPort();
    await services.hme.SearchDevice();

  } catch (e) {

    console.log("error", e);

  }
}
