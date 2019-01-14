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
