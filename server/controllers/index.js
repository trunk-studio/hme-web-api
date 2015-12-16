
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

      publicRoute.get('/rest/hme/login', UserController.login);

      publicRoute.get('/', function *() {
        const HTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Redux Demo</title>

            <script>
            </script>
          </head>
          <body>
            <div id="react-view"></div>
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
