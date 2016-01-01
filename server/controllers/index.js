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

    publicRoute.post('/rest/hme/login', UserController.login);

    publicRoute.post('/rest/schedule/create', ScheduleController.createSchedule);
    publicRoute.get('/rest/schedule/findAll', ScheduleController.getAllSchedule);
    publicRoute.get('/rest/schedule/:id', ScheduleController.getOneSchedule);
    publicRoute.post('/rest/schedule/update/day', ScheduleController.updateScheduleDay);
    publicRoute.post('/rest/schedule/update/detail', ScheduleController.updateScheduleDetail);

    publicRoute.post('/rest/schedule/config/update', ScheduleController.configUpdate);
    publicRoute.get('/rest/schedule/config/:id', ScheduleController.getConfigDetail);

    publicRoute.get('/', function *() {
      const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Material UI</title>
        <meta name="description" content="Google's material design UI components built with React.">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet">
        <link rel=stylesheet type="text/css" href="assets/graph.css">
        <link rel=stylesheet type="text/css" href="assets/nv.d3.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
        <link rel=stylesheet type="text/css" href="assets/index.css">
        </head>
        <body>
          <div id="react-view"></div>
          <script type="application/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min.js"></script>
          <script type="text/javascript" src="http://mbostock.github.com/d3/d3.v2.js"></script>
          <script type="text/javascript" src="assets/graph.js"></script>
          <script type="application/javascript" src="assets/bundle.js"></script>
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
