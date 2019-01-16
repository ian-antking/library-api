exports.newBook = (credentials, book) => new Promise((resolve, reject) => {
  chai.request(server)
    .post('/book')
    .set('Authorizer', credentials)
    .send(book)
    .end((error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
});
