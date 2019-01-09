const mongoose = require('mongoose');
const User = require('../src/models/user');

describe('user', () => {
  afterEach((done) => {
    mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  describe('POST /user', () => {
    it('crates a new user', (done) => {
      chai.request(server)
        .post('/user')
        .send({
          firstName: 'mockFirstname',
          lastName: 'mockLastname',
          email: 'mockEmail@mockemail.com',
          password: 'mockPassword',
        })
        .end((error, res) => {
          expect(error).to.equal(null);
          expect(res.status).to.equal(201);
          expect(res.body).not.to.have.property('password');

          User.findById(res.body._id, (err, user) => {
            expect(err).to.equal(null);
            expect(user.firstName).to.equal('mockFirstname');
            expect(user.lastName).to.equal('mockLastname');
            expect(user.email).to.equal('mockEmail@mockemail.com');
            done();
          });
        });
    });
    it('requires a valid email', (done) => {
      chai.request(server)
        .post('/user')
        .send({
          firstName: 'mockFirstname',
          lastName: 'mockLastname',
          email: 'mockEmail',
          password: 'mockPassword',
        })
        .end((error, res) => {
          expect(res.status).to.equal(422);
          expect(res.body.errors.email).to.equal('Invalid email address');
          User.countDocuments((err, count) => {
            expect(count).to.equal(0);
          });
          done();
        });
    });
    it('requires passwords to be 8 characters long', (done) => {
      chai.request(server)
        .post('/user')
        .send({
          firstName: 'mockFirstname',
          lastName: 'mockLastname',
          email: 'mockEmail@mockemail.com',
          password: 'mock',
        })
        .end((error, res) => {
          expect(res.status).to.equal(422);
          expect(res.body.errors.password).to.equal('Password must be at least 8 characters long');
          User.countDocuments((err, count) => {
            expect(count).to.equal(0);
          });
          done();
        });
    });
  });
});
