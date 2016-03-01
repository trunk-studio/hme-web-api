import Services from '../../server/services'
// import config from '../../server/config/init';
import config from '../../server/config/test';

global.appConfig = config;

var chai = require('chai');
chai.should();

global.request = require("supertest-as-promised");
global.sinon = require("sinon");

global.services = new Services();
