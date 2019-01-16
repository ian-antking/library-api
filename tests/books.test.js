const UserHelpers = require('./helpers/user-helpers');
const BookHelpers = require('./helpers/book-helpers');
const DataFactory = require('./helpers/data-factory');
const Book = require('../src/models/book');

describe('Books', () => {
  describe('POST /books', () => {
    it('creates a book listing', (done) => {
      const user = DataFactory.user();
      UserHelpers.signup(user)
        .then(() => {
          UserHelpers.login(user)
            .then(credentials => {
              const data = DataFactory.book();
              BookHelpers.newBook(credentials.body.token, data)
                .then(res => {
                  expect(res.status).to.equal(201);

                  Book.findById(res.body._id, (err, book) => {
                    expect(err).to.equal(null);
                    expect(book).to.have.property('title');
                    expect(book.title).to.equal(data.title);
                    expect(book).to.have.property('author');
                    expect(book.author).to.equal(data.author);
                    expect(book).to.have.property('genre');
                    expect(book.genre).to.equal(data.genre);
                    expect(book).to.have.property('isbn');
                    expect(book.isbn).to.equal(data.isbn);
                    expect(book).to.have.property('user');
                    // expect(book.user).to.deep.equal(res.body._id);
                    done();
                  });
                })
                .catch(error => done(error));
            })
            .catch(error => done(error));
        })
        .catch(error => done(error));
    });
    it('requires a title', (done) => {
      const user = DataFactory.user();
      UserHelpers.signup(user)
        .then(() => {
          UserHelpers.login(user)
            .then(credentials => {
              const data = DataFactory.book();
              delete data.title;
              BookHelpers.newBook(credentials.body.token, data)
                .then(res => {
                  expect(res.status).to.equal(400);
                  expect(res.body.errors.title).to.equal('title is required');
                  done();
                })
                .catch(error => done(error));
            })
            .catch(error => done(error));
        })
        .catch(error => done(error));
    });
    it('requires an author', (done) => {
      const user = DataFactory.user();
      UserHelpers.signup(user)
        .then(() => {
          UserHelpers.login(user)
            .then(credentials => {
              const data = DataFactory.book();
              delete data.author;
              BookHelpers.newBook(credentials.body.token, data)
                .then(res => {
                  expect(res.status).to.equal(400);
                  expect(res.body.errors.author).to.equal('author is required');
                  done();
                })
                .catch(error => done(error));
            })
            .catch(error => done(error));
        })
        .catch(error => done(error));
    });
    it('rejects unauthorised requests', (done) => {
      const data = DataFactory.book();
      BookHelpers.newBook(null, data)
        .then(res => {
          expect(res.status).to.equal(401);
          expect(res.body.error).to.equal('jwt malformed');

          Book.countDocuments((err, count) => {
            expect(count).to.equal(0);
          });
          done();
        })
        .catch(error => done(error));
    });
  });
});
