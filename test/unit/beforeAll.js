import Services from '../../server/services'
import config from '../../server/config/init';
global.appConfig = config;

var chai = require('chai');
chai.should();

global.request = require("supertest-as-promised");
global.sinon = require("sinon");

global.services = new Services();
