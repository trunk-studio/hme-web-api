import Services from '../../server/services'

var chai = require('chai');
chai.should();

global.request = require("supertest-as-promised");
global.sinon = require("sinon");

global.services = new Services();
