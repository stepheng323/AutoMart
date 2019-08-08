/* eslint-disable no-undef */
import chai from 'chai';
import 'chai/register-expect';
import chaihttp from 'chai-http';
import app from '../src/app';

chai.use(chaihttp);
describe('Auth', () => {
  // it('signup should create a user', (done) => {
  //   chai
  //     .request(app)
  //     .post('/api/v1/auth/signup')
  //     .send({
  //       email: 'henyhart582@swellview.com',
  //       first_name: 'henry',
  //       last_name: 'hart',
  //       password: 'captainman',
  //       address: '2345 avenue mancave swellview',
  //     })
  //     .end((err, res) => {
  //       console.log(res);
  //       expect(res.body).to.have.status(201);
  //       expect(res.body).to.be.a('object');
  //       expect(res.body.data).to.have.a.property('token');
  //       expect(res.body.data).to.have.a.property('id');
  //       expect(res.body.data).to.have.a.property('first_name');
  //       expect(res.body.data).to.have.a.property('last_name');
  //       expect(res.body.data).to.have.a.property('email');
  //       done();
  //     });
  // });
  it('sign a user in and return token', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'temi@gmail.com',
        password: 'biodun',
      })
      .end((err, res) => {
        console.log(res.body);
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
});
