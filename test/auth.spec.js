/* eslint-disable no-undef */
import chai from 'chai';
import 'chai/register-expect';
import chaihttp from 'chai-http';
import app from '../src/app';

chai.use(chaihttp);

describe('Auth', () => {
  it('signup should create a user', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'steheng758@gmail.com',
        first_name: 'abioduon',
        last_name: 'oyebanji',
        password: 'olaTUNDE',
        address: '13',
        is_admin: false,
      })
      .end((err, res) => {
        expect(res.body).to.have.status(201);
        expect(res.body).to.be.a('object');
        expect(res.body.data).to.have.a.property('token');
        expect(res.body.data).to.have.a.property('id');
        expect(res.body.data).to.have.a.property('first_name');
        expect(res.body.data).to.have.a.property('last_name');
        expect(res.body.data).to.have.a.property('email');
        done();
      });
  });
});
it('sign a user in and return token', (done) => {
  chai
    .request(app)
    .post('/api/v1/auth/signin')
    .send({
      email: 'steipheng323@gmail.com',
      password: 'olaTUNDE',
    })
    .end((err, res) => {
      expect(res.body).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body.data).to.have.a.property('token');
      expect(res.body.data).to.have.a.property('id');
      expect(res.body.data).to.have.a.property('first_name');
      expect(res.body.data).to.have.a.property('last_name');
      expect(res.body.data).to.have.a.property('email');
      done();
    });
});
