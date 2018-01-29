import request from 'supertest';
const server = request.agent('http://localhost:3000');

xdescribe('Authentication user', () => {
  it('should create new user', done => {
    request(server)
      .post('/signin')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
