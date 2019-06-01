const chai = require('chai');
// eslint-disable-next-line prefer-destructuring
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../app');

describe('Signup', () => {
  const mock = {
    email: 'stepheng323@gmail.com',
    first_name: 'abioduon',
    last_name: 'oyebanji',
    password: 'olaTUNDE',
    address: '13',
    is_admin: 'false',
  };
  it('signup should create a user', () => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(mock)
      .end((err, res) => {
        expect(res.body).to.have.status(200);
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
