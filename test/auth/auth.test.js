import request from 'supertest';
import chai from 'chai';
import server from '../../server/server';
const expect = chai.expect;

xdescribe('Authentication user', () => {
  it('should create new user', done => {
    request(server)
      .post('/signin')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
        done(err);
      });
  });
});
