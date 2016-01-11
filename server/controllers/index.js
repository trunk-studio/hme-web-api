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

    publicRoute.get('/rest/user/', UserController.index);
    publicRoute.get('/rest/hme/hello/', HmeController.hello);
    publicRoute.get('/rest/hme/ping/', HmeController.ping);
    publicRoute.get('/rest/hme/searchDevice', HmeController.searchDevice);
    publicRoute.get('/rest/hme/deviceGroup/findAll', HmeController.findAllDeviceGroups);

    publicRoute.post('/rest/hme/login', UserController.login);
    publicRoute.post('/rest/schedule/create', ScheduleController.createSchedule);
    publicRoute.get('/rest/schedule/findAll', ScheduleController.getAllSchedule);
    publicRoute.get('/rest/schedule/:id', ScheduleController.getOneSchedule);
    publicRoute.post('/rest/schedule/update/day', ScheduleController.updateScheduleDay);
    publicRoute.post('/rest/schedule/update/list', ScheduleController.updateScheduleList);
    publicRoute.post('/rest/schedule/update/detail', ScheduleController.updateScheduleDetail);
    publicRoute.post('/rest/schedule/update/details', ScheduleController.updateScheduleDetails);

    publicRoute.post('/rest/schedule/config/update', ScheduleController.configUpdate);
    publicRoute.get('/rest/schedule/config/:id', ScheduleController.getConfigDetail);

    //  Test Device
    publicRoute.get('/rest/hme/device/test/all', HmeController.testAllDevices);
    publicRoute.get('/rest/hme/device/test/one/:id', HmeController.testDeviceByID);
    publicRoute.get('/rest/hme/device/test/group/id', HmeController.testGruopByID);



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
