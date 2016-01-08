'use strict';

import path from 'path';
import debug from 'debug';

import koa from 'koa';
import responseTime from 'koa-response-time';
import logger from 'koa-logger';
import koaBodyParser from 'koa-bodyparser';

import bootstrap from './bootstrap';
import config from './config/init';
import Models from './models';
import Controllers from './controllers';
import Services from './services';

// mount route
import mount from 'koa-mount';
import serve from 'koa-static';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import webpackDevMiddleware from 'koa-webpack-dev-middleware';
import webpackHotMiddleware from 'koa-webpack-hot-middleware';
import moment from 'moment';
global.moment = moment;
<<<<<<< HEAD
import sinon from 'sinon';
global.sinon = sinon;
=======
global.appConfig = config;
>>>>>>> master/master


const {environment} = appConfig;
const app = koa();

const compiler = webpack(webpackConfig);


app.use(koaBodyParser());


// setup rest models
global.models = (new Models()).getDb();

app.use(responseTime());
app.use(logger());


if (environment === 'production') {
  // set debug environment to `koa` only
  // must be set programmaticaly for windows
  debug.enable('koa');

}

if (environment === 'development') {
  // set debug environment, must be programmaticaly for windows
  debug.enable('dev,koa');
  // log when process is blocked
  require('blocked')((ms) => debug('koa')(`blocked for ${ms}ms`));
}


global.services = new Services();

var controllers = new Controllers(app);
controllers.setupPublicRoute()
controllers.setupAppRoute()

if (environment === 'development') {
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    })
  );
  app.use(webpackHotMiddleware(compiler));
}


// app.use(function* (next) {
//   yield require("webpack-hot-middleware")(compiler).bind(null, this.req, this.res);
//   yield next;
// });


app.use(mount('/', serve(path.join(__dirname, '../public/assets'))));



var liftApp = async () => {
  try {
    console.log('=== liftApp ===');
    await models.sequelize.sync({force: config.connection.force})

    await bootstrap();

    app.listen(config.port);

    if (process.send) process.send('online');
    debug('koa')(`Application started on port ${config.port}`);

  } catch (e) {
      console.log(e.stack);
  }

  return app;

}

if (environment !== 'test') liftApp();

module.exports = liftApp
