exports.signup = data => new Promise((resolve, reject) => {
  chai.request(server)
    .post('/user')
    .send(data)
    .end((error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
});

exports.login = user => new Promise((resolve, reject) => {
  chai.request(server)
    .post('/auth/login')
    .send({
      email: user.email,
      password: user.password,
    })
    .end((error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
});
