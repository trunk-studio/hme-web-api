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
            if(ctx.request.header.host.indexOf(slave.host.split(':')[0]) != -1){
              console.log("My router");
              await next();
            }else{
              console.log(slave.host, "proxy: ", ctx.request.method, 'http://'+ slave.host + ctx.request.url);
              let result = await new Promise((resolve, reject) => {
                request({
                  method: ctx.request.method,
                  baseURL: 'http://'+ slave.host+":3000",
                  url: ctx.request.url,
                  // url: 'http://'+ slave.host + '/rest/hme/getCachedDeviceList',
                  data: ctx.request.body || {}
                }).then(function(res){
                  if (res instanceof Error) {
                    reject(res);
                  } else {
                    resolve(res);
                  }
                })
              });
              ctx.body =  result.data;
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

    // app.use(async function (ctx, next) {
    //
    //   if (false) {
    //     await next();
    //   } else {
    //
    //     console.log(ctx.request);
    //     // ctx.redirect('/#/');
    //
    //   }
    // })


    publicRoute.get('/rest/info/', async function(ctx) {
      let {APP_NAME} = process.env
      ctx.body = {APP_NAME}
    })

    // Test Raspberry Pi connect
    publicRoute.get('/rest/hme/hello/', HmeController.hello);
    publicRoute.get('/rest/hme/ping/', HmeController.ping);
    publicRoute.get('/rest/hme/searchSlave', HmeController.searchSlave);
    publicRoute.get('/rest/hme/getCachedSlaveList', HmeController.getCachedSlaveList);
    publicRoute.get('/rest/hme/getCachedDeviceList', HmeController.getCachedDeviceList);
    publicRoute.get('/rest/hme/getCachedSlaveAndDeviceList', HmeController.getCachedSlaveAndDeviceList);

    // master
    publicRoute.get('/rest/master/user/', UserController.index);
    publicRoute.post('/rest/master/login', UserController.login);
    publicRoute.post('/rest/master/saveEmail', HmeController.saveEmail);
    publicRoute.get('/rest/master/loadEmail', HmeController.loadEmail);
    publicRoute.get('/rest/master/syncAllSlaveAndDevice', HmeController.syncAllSlaveAndDevice);
    publicRoute.post('/rest/master/schedule/create', ScheduleController.createSchedule);
    publicRoute.post('/rest/master/schedule/easy/create', ScheduleController.createEasySchedule);
    publicRoute.get('/rest/master/schedule/findAll', ScheduleController.getAllSchedule);
    publicRoute.get('/rest/master/slave/:slaveId/schedule/findAll', ScheduleController.getAllScheduleBySlaveId);
    publicRoute.get('/rest/master/schedule/:id', ScheduleController.getOneSchedule);
    publicRoute.get('/rest/master/schedule/easy/:slaveId', ScheduleController.getOneEasySchedule);
    publicRoute.post('/rest/master/schedule/update/day', ScheduleController.updateScheduleDay);
    publicRoute.post('/rest/master/schedule/update/list', ScheduleController.updateScheduleList);
    publicRoute.post('/rest/master/schedule/update/detail', ScheduleController.updateScheduleDetail);
    publicRoute.post('/rest/master/schedule/update/details', ScheduleController.updateScheduleDetails);
    publicRoute.post('/rest/master/schedule/config/update', ScheduleController.configUpdate);
    publicRoute.get('/rest/master/schedule/config/:id', ScheduleController.getConfigDetail);
    publicRoute.post('/rest/master/schedule/previewLedColor', HmeController.previewLedColor);
    publicRoute.post('/rest/master/schedule/setOnDevice', ScheduleController.setScheduleListToDevice);
    publicRoute.post('/rest/master/schedule/setFastRun', ScheduleController.setFastRun);
    publicRoute.post('/rest/master/schedule/setSimRtc', ScheduleController.setSimRtc);
    // find slave Device & Groups
    publicRoute.get('/rest/slave/:slaveId/searchDevice', HmeController.searchDevice);
    publicRoute.get('/rest/slave/:slaveId/getCachedDeviceList', HmeController.getCachedDeviceListBySlave);
    publicRoute.get('/rest/slave/:slaveId/test/all', HmeController.testAllDevices);
    publicRoute.get('/rest/slave/:slaveId/device/:deviceId/test', HmeController.testDeviceByID);
    publicRoute.get('/rest/slave/:slaveId/test', HmeController.testGruopByID);
    publicRoute.post('/rest/slave/:slaveId/device/:deviceId/setLedDisplay', HmeController.setLedDisplay);
    publicRoute.post('/rest/slave/:slaveId/schedule/setOnDevice', ScheduleController.slaveSetScheduleListToDevice);
    publicRoute.post('/rest/slave/:slaveId/schedule/setFastRun', ScheduleController.slaveSetFastRun);
    publicRoute.post('/rest/slave/:slaveId/schedule/setSimRtc', ScheduleController.slaveSetSimRtc);

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
        <meta name="apple-mobile-web-app-capable" content="yes">
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




  }

  setupAppRoute() {

    this.app.use(this.router.middleware())


  }


}
