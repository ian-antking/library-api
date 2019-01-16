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

exports.manyBooks = (credentials, bookList) => new Promise((resolve, reject) => {
  bookList.forEach(book => {
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
});

exports.getBooks = (data) => new Promise((resolve, reject) => {
  chai.request(server)
    .get('/book')
    .send(data)
    .end((error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
});
