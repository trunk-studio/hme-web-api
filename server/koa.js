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

import mount from 'koa-mount';
import serve from 'koa-static';

const env = process.env.NODE_ENV || 'development';
const app = koa();

app.use(koaBodyParser());


// setup rest models
global.models = (new Models()).getDb();

app.use(responseTime());
app.use(logger());


if (env === 'production') {
  // set debug env to `koa` only
  // must be set programmaticaly for windows
  debug.enable('koa');

}

if (env === 'development') {
  // set debug env, must be programmaticaly for windows
  debug.enable('dev,koa');
  // log when process is blocked
  require('blocked')((ms) => debug('koa')(`blocked for ${ms}ms`));
}


global.services = new Services();

var controllers = new Controllers(app);
controllers.setupPublicRoute()
controllers.setupAppRoute()

app.use(mount('/assets', serve(path.join(__dirname, '../public/js'))));


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

if (env !== 'test') liftApp();

module.exports = liftApp
