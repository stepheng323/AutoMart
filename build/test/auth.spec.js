"use strict";

var _chai = _interopRequireDefault(require("chai"));

require("chai/register-expect");

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-undef */
_chai["default"].use(_chaiHttp["default"]);

describe('Auth', function () {
  it('signup should create a user', function () {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
      email: 'steiipheng323@gmail.com',
      first_name: 'abioduon',
      last_name: 'oyebanji',
      password: 'olaTUNDE',
      address: '13',
      is_admin: 'false'
    }).then(function (err, res) {
      expect(res.body).to.have.status(201).and.to.be.a('number');
      expect(res.body).to.be.a('object');
      expect(res.body.data).to.have.a.property('token').and.to.be.a('string');
      expect(res.body.data).to.have.a.property('id');
      expect(res.body.data).to.have.a.property('first_name').and.to.be.a('string');
      expect(res.body.data).to.have.a.property('last_name').and.to.be.a('string');
      expect(res.body.data).to.have.a.property('email').and.to.be.a('string');
      done();
    });
  });
  it('sign a user in', function () {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
      email: 'steiipheng323@gmail.com',
      password: 'olaTUNDE'
    }).then(function (err, res) {
      expect(res.body).to.be.a('object');
      expect(res.body.data).to.have.a.property('token').and.to.be.a('string');
      expect(res.body.data).to.have.a.property('id');
      expect(res.body.data).to.have.a.property('first_name').and.to.be.a('string');
      expect(res.body.data).to.have.a.property('last_name').and.to.be.a('string');
      expect(res.body.data).to.have.a.property('email').and.to.be.a('string');
      done();
    });
  });
});