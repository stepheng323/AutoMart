/* eslint-disable no-undef */
import chai from 'chai';
import 'chai/register-expect';
import chaihttp from 'chai-http';
import app from '../app';

chai.use(chaihttp);

describe('Auth', () => {
  it('signup should create a user', () => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'steiipheng323@gmail.com',
        first_name: 'abioduon',
        last_name: 'oyebanji',
        password: 'olaTUNDE',
        address: '13',
        is_admin: 'false',
      })
      .end((err, res) => {
        expect(res.body).to.have.status(201);
        expect(res.body).to.be.a('object');
        expect(res.body.data).to.have.a.property('id');
        expect(res.body.data)
          .to.have.a.property('first_name')
          .and.to.be.a('string');
        expect(res.body.data)
          .to.have.a.property('last_name')
          .and.to.be.a('string');
        expect(res.body.data)
          .to.have.a.property('email')
          .and.to.be.a('string');
      });
  });
});
