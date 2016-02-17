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
import send from 'koa-send';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import webpackDevMiddleware from 'koa-webpack-dev-middleware';
import webpackHotMiddleware from 'koa-webpack-hot-middleware';
import moment from 'moment';
import sinon from 'sinon';
import fs from 'fs-extra';

global.appConfig = config;

global.moment = moment;
global.sinon = sinon;
global.fs = fs;

const {environment} = appConfig;
const app = new koa();
const convert = require('koa-convert');

const jwt = require('koa-jwt');

// do not use this secret for production
const secret = config.secret;

app.use(convert(koaBodyParser()));
app.use(convert(jwt({ secret }).unless({
  path: [/^(?!\/api\/)/]
})));

// setup rest models
global.models = (new Models()).getDb();

app.use(convert(responseTime()));
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

  // hotReload
  const compiler = webpack(webpackConfig);
  app.use(
    convert(webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    })
  ));
  app.use(convert(webpackHotMiddleware(compiler)));
}




global.services = new Services();
var controllers = new Controllers(app);


app.use(async function (ctx, next) {
  try {
    await next();
  } catch (error) {
    await services.logger.error({error});
    throw error;
  }
});


controllers.getSlaveHostRoute()
controllers.setupPublicRoute()
controllers.setupAppRoute()

app.use(async function (ctx, next){
  console.log('=== send file ===');
  console.log('=== ctx.path ===', ctx.path);
  await send(ctx, ctx.path);
})
// app.use(function* (next) {
//   yield require("webpack-hot-middleware")(compiler).bind(null, this.req, this.res);
//   yield next;
// });






var liftApp = async () => {
  try {
    await models.sequelize.sync({force: config.connection.force})

    console.log(config);
    app.listen(config.port);
    await bootstrap();

    if (process.send) process.send('online');
    debug('koa')(`Application started on port ${config.port}`);

  } catch (e) {
      console.log(e.stack);
  }

  return app;

}
if (environment !== 'test') liftApp();

module.exports = liftApp
