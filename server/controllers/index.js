
import UserController from './user';
import HmeController from './hme';

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

    publicRoute.get('/rest/user/', UserController.index);
    publicRoute.get('/rest/hme/hello/', HmeController.hello);
    publicRoute.get('/rest/hme/ping/', HmeController.ping);
    publicRoute.get('/rest/hme/searchDevice', HmeController.searchDevice);

    publicRoute.post('/rest/hme/login', UserController.login);

    publicRoute.get('/', function *() {
      const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Redux Demo</title>
          <link rel=stylesheet type="text/css" href="assets/graph.css">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
        </head>
        <body>
          <div id="react-view"></div>
          <script type="text/javascript" src="http://mbostock.github.com/d3/d3.v2.js"></script>
          <script type="text/javascript" src="assets/graph.js"></script>
          <script type="application/javascript" src="assets/bundle.js"></script>
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
