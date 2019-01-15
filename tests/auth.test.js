const UserHelpers = require('./helpers/user-helpers');
const DataFactory = require('./helpers/data-factory');
const jwt = require('jsonwebtoken');

describe('Auth', () => {
  describe('POST /auth/login', () => {
    it('issues a web token', (done) => {
      const data = DataFactory.user();
      UserHelpers.signup(data)
        .then(() => {
          UserHelpers.login(data)
            .then(res => {
              expect(res.status).to.equal(200);
              const token = jwt.decode(res.body.token);
              expect(token).to.have.property('_id');
              expect(token).to.have.property('firstName');
              expect(token).to.have.property('lastName');
              done();
            })
            .catch(error => done(error));
        })
        .catch(error => done(error));
    });
    it('handles invalid authentication', (done) => {
      const data = DataFactory.user();
      UserHelpers.signup(data)
        .then(() => {
          UserHelpers.login(DataFactory.user())
            .then(res => {
              expect(res.status).to.equal(401);
              done();
            })
            .catch(error => done(error));
        })
        .catch(error => done(error));
    });
  });
});
