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
          email: 'mockEmail',
          password: 'mockPassword',
        })
        .end((error, res) => {
          expect(error).to.equal(null);
          expect(res.status).to.equal(201);

          User.findById(res.body._id, (err, user) => {
            expect(err).to.equal(null);
            expect(user.firstName).to.equal('mockFirstname');
            expect(user.lastName).to.equal('mockLastname');
            expect(user.email).to.equal('mockEmail');
            expect(user.password).to.equal('mockPassword');
            done();
          });
        });
    });
  });
});
