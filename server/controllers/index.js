import UserController from './user';
import HmeController from './hme';
import ScheduleController from './schedule'

import Router from 'koa-router';
import fs from 'fs';
import path from 'path';
import request from 'axios'

export default class Routes {

  constructor (app) {
    var router = new Router();
    this.router = router;
    this.app = app;

  }

  getSlaveHostRoute(){
    var app = this.app;
    var getSlaveRoute = new Router()

    getSlaveRoute.all([
      '/rest/slave/:slaveId/searchDevice',
      '/rest/slave/:slaveId/getCachedDeviceList',
      '/rest/slave/:slaveId/test/all',
      '/rest/slave/:slaveId/device/:deviceId/test',
      '/rest/slave/:slaveId/test',
      '/rest/slave/:slaveId/device/:deviceId/setLedDisplay',
      '/rest/slave/:slaveId/schedule/setOnDevice',
      '/rest/slave/:slaveId/findAllDeviceGroups'
      ],
      async function (ctx, next){
        try {

          let slaveId =  ctx.params.slaveId;
          let slave = await services.deviceControl.getSlaveHost(slaveId);
          if(slave){
            if(ctx.request.header.host.indexOf(slave.host) != -1){
              console.log("My router");
              await next();
            }else{
              console.log(slave.host, "proxy: ", ctx.request.method, 'http://'+ slave.host + ctx.request.url);
              request({
                method: ctx.request.method,
                url: 'http://'+ slave.host + ctx.request.url,
                data: ctx.request.body || {}
              })
            }
          }else{
            await next();
          }
        } catch (e) {
          console.log(e);
          throw e
        }
      }
    );

    app.use(getSlaveRoute.middleware());
  }

  setupPublicRoute() {
    var app = this.app;
    var publicRoute = new Router()

    publicRoute.get('/rest/info/', async function(ctx) {
      let {APP_NAME} = process.env
      ctx.body = {APP_NAME}
    })

    // Test Raspberry Pi connect
    publicRoute.get('/rest/hme/hello/', HmeController.hello);
    publicRoute.get('/rest/hme/ping/', HmeController.ping);
    publicRoute.get('/rest/hme/searchSlave', HmeController.searchSlave);
    publicRoute.get('/rest/hme/getCachedSlaveList', HmeController.getCachedSlaveList);

    // master
    publicRoute.get('/rest/master/user/', UserController.index);
    publicRoute.post('/rest/master/login', UserController.login);
    publicRoute.post('/rest/master/schedule/create', ScheduleController.createSchedule);
    publicRoute.get('/rest/master/schedule/findAll', ScheduleController.getAllSchedule);
    publicRoute.get('/rest/master/slave/:slaveId/schedule/findAll', ScheduleController.getAllScheduleBySlaveId);
    publicRoute.get('/rest/master/schedule/:id', ScheduleController.getOneSchedule);
    publicRoute.post('/rest/master/schedule/update/day', ScheduleController.updateScheduleDay);
    publicRoute.post('/rest/master/schedule/update/list', ScheduleController.updateScheduleList);
    publicRoute.post('/rest/master/schedule/update/detail', ScheduleController.updateScheduleDetail);
    publicRoute.post('/rest/master/schedule/update/details', ScheduleController.updateScheduleDetails);
    publicRoute.post('/rest/master/schedule/config/update', ScheduleController.configUpdate);
    publicRoute.get('/rest/master/schedule/config/:id', ScheduleController.getConfigDetail);

    // find slave Device & Groups
    publicRoute.get('/rest/slave/:slaveId/searchDevice', HmeController.searchDevice);
    publicRoute.get('/rest/slave/:slaveId/getCachedDeviceList', HmeController.getCachedDeviceList);
    publicRoute.get('/rest/slave/:slaveId/test/all', HmeController.testAllDevices);
    publicRoute.get('/rest/slave/:slaveId/device/:deviceId/test', HmeController.testDeviceByID);
    publicRoute.get('/rest/slave/:slaveId/test', HmeController.testGruopByID);
    publicRoute.post('/rest/slave/:slaveId/device/:deviceId/setLedDisplay', HmeController.setLedDisplay);
    publicRoute.post('/rest/slave/:slaveId/schedule/setOnDevice', ScheduleController.setScheduleListToDevice);

    publicRoute.get('/rest/slave/:slaveId/findAllDeviceGroups', HmeController.findAllDeviceGroups);



    publicRoute.get('/', function(ctx, next) {
      const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>HME</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1 ,maximum-scale=1.0, user-scalable=no">
        <link rel="shortcut icon" href="/public/assets/images/HME.ico" type="image/x-icon" />
        <!--<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet">-->
        </head>
        <body>
          <div id="react-view"></div>
          <script type="application/javascript" src="/public/assets/js/bundle.js"></script>
          <!--<script>
            document.body.addEventListener('touchstart', function(e){ e.preventDefault(); });
          </script>-->
        </body>
      </html>
      `;
      ctx.body = HTML
    })
    // publicRoute.get('/', MainController.index);
    app.use(publicRoute.middleware())


    app.use(async function (ctx, next) {

      if (true || services.user.isAuthenticated(ctx)) {
        await next();
      } else {
        ctx.redirect('/auth/login')
      }
    })

  }

  setupAppRoute() {

    this.app.use(this.router.middleware())


  }


}
