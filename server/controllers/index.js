
import UserController from './user';

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
