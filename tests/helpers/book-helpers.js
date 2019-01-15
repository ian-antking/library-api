exports.newBook = (user, book) => new Promise((resolve, reject) => {
  chai.request(server)
    .post('/book')
    .send({ user, book })
    .end((error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
});
