import UserController from './user';
import HmeController from './hme';
import ScheduleController from './schedule'

import Router from 'koa-router';
import fs from 'fs';
import path from 'path';

export default class Routes {

  constructor (app) {
    var router = new Router();
    this.router = router;
    this.app = app;

  }

  setupPublicRoute() {
    var app = this.app;
    var publicRoute = new Router()

    publicRoute.get('/rest/info/', function *() {
      let {APP_NAME} = process.env
      this.body = {APP_NAME}
    })

    // Test Raspberry Pi connect
    publicRoute.get('/rest/hme/hello/', HmeController.hello);
    publicRoute.get('/rest/hme/ping/', HmeController.ping);

    // master
    publicRoute.get('/rest/master/user/', UserController.index);
    publicRoute.post('/rest/master/login', UserController.login);
    publicRoute.post('/rest/master/schedule/create', ScheduleController.createSchedule);
    publicRoute.get('/rest/master/schedule/findAll', ScheduleController.getAllSchedule);
    publicRoute.get('/rest/master/schedule/:id', ScheduleController.getOneSchedule);
    publicRoute.post('/rest/master/schedule/update/day', ScheduleController.updateScheduleDay);
    publicRoute.post('/rest/master/schedule/update/list', ScheduleController.updateScheduleList);
    publicRoute.post('/rest/master/schedule/update/detail', ScheduleController.updateScheduleDetail);
    publicRoute.post('/rest/master/schedule/update/details', ScheduleController.updateScheduleDetails);
    publicRoute.post('/rest/master/schedule/config/update', ScheduleController.configUpdate);
    publicRoute.get('/rest/master/schedule/config/:id', ScheduleController.getConfigDetail);
    publicRoute.post('/rest/master/schedule/setOnDevice', ScheduleController.setSchedulesToDevice);

    // find slave Device & Groups
    publicRoute.get('/rest/slave/searchDevice', HmeController.searchDevice);
    publicRoute.get('/rest/slave/findAllDeviceGroups', HmeController.findAllDeviceGroups);
    publicRoute.get('/rest/slave/getCachedDeviceList', HmeController.getCachedDeviceList);

    //  Test slave Device
    publicRoute.get('/rest/slave/test/all', HmeController.testAllDevices);
    publicRoute.get('/rest/slave/test/one/:id', HmeController.testDeviceByID);
    publicRoute.get('/rest/slave/test/group/id', HmeController.testGruopByID);
    publicRoute.post('/rest/slave/test/setLedDisplay', HmeController.setLedDisplay);



    publicRoute.get('/', function *() {
      const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>HME</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!--<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet">-->
        </head>
        <body>
          <div id="react-view"></div>
          <script type="application/javascript" src="js/bundle.js"></script>
          <!--<script>
            document.body.addEventListener('touchstart', function(e){ e.preventDefault(); });
          </script>-->
        </body>
      </html>
      `;
      this.body = HTML
    })
    // publicRoute.get('/', MainController.index);
    app.use(publicRoute.middleware())


    app.use(function *(next) {

      if (true || services.user.isAuthenticated(this)) {
        yield next
      } else {
        this.redirect('/auth/login')
      }
    })

  }

  setupAppRoute() {

    this.app.use(this.router.middleware())


  }

}
