const User = require('../src/models/user');
const UserHelpers = require('./helpers/user-helpers');
const DataFactory = require('./helpers/data-factory');

describe('user', () => {
  describe('POST /user', () => {
    it('crates a new user', (done) => {
      const data = DataFactory.user();
      UserHelpers.signup(data)
        .then(res => {
          expect(res.status).to.equal(201);
          expect(res.body).not.to.have.property('password');

          User.findById(res.body._id, (err, user) => {
            expect(err).to.equal(null);
            expect(user.firstName).to.equal(data.firstName);
            expect(user.lastName).to.equal(data.lastName);
            expect(user.email).to.equal(data.email);
            done();
          });
        })
        .catch(error => done(error));
    });
    it('requires a valid email', (done) => {
      const data = DataFactory.user({ email: 'mockEmail' });
      UserHelpers.signup(data)
        .then(res => {
          expect(res.status).to.equal(422);
          expect(res.body.errors.email).to.equal('Invalid email address');
          User.countDocuments((err, count) => {
            expect(count).to.equal(0);
            done();
          })
            .catch(error => done(error));
        });
    });
    it('requires passwords to be 8 characters long', (done) => {
      const data = DataFactory.user({ password: 'pass' });
      UserHelpers.signup(data)
        .then(res => {
          expect(res.status).to.equal(422);
          expect(res.body.errors.password).to.equal('Password must be at least 8 characters long');
          User.countDocuments((err, count) => {
            expect(count).to.equal(0);
            done();
          })
            .catch(error => done(error));
        });
    });
  });
});
