/* eslint-disable no-undef */
import chai from 'chai';
import 'chai/register-expect';
import chaihttp from 'chai-http';
import app from '../src/app';

chai.use(chaihttp);

describe('Order', () => {
  it('should post order', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'temi@gmail.com',
        password: 'biodun',
      })
      .end((err, res) => {
        if (err) {
          console.log(err.message);
          return;
        }
        const { token } = res.body.data;
        const bearerToken = `Bearer ${token}`;
        chai
          .request(app)
          .post('/api/v1/order')
          .set('Authorization', bearerToken)
          .send({
            car_id: 12,
            amount: 50000,
          })
          .end((err2, res2) => {
            if (err2) {
              console.log(err2.message);
              return;
            }
            const { data } = res2.body;
            expect(res2.body).to.have.status(201);
            expect(data).to.have.a.property('id');
            expect(data).to.have.a.property('car_id');
            expect(data).to.have.a.property('created_on');
            expect(data).to.have.a.property('price');
            expect(data).to.have.a.property('price_offerd');
            done();
          });
      });
  });
  it('should update order price', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'temi@gmail.com',
        password: 'biodun',
      })
      .end((err, res) => {
        if (err) {
          console.log(err.message);
          return;
        }
        const { token } = res.body.data;
        const bearerToken = `Bearer ${token}`;
        chai
          .request(app)
          .patch('/api/v1/order/25/price')
          .set('Authorization', bearerToken)
          .send({
            new_price_offered: 70000,
          })
          .end((err2, res2) => {
            if (err2) {
              console.log(err);
              return;
            }
            expect(res2.body).to.have.status(200);
            expect(res2.body.data).have.a.property('id');
            expect(res2.body.data).have.a.property('car_id');
            expect(res2.body.data).have.a.property('status');
            expect(res2.body.data).have.a.property('old_price_offered');
            expect(res2.body.data).have.a.property('new_price_offered');
            done();
          });
      });
  });
});
