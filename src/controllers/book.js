const Book = require('../models/book');

exports.addBook = (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    isbn: req.body.isbn,
    user: req.authorizer._id,
  });

  book.save().then(() => {
    res.status(201).json(book);
  })
    .catch(error => {
      if (error.name === 'ValidationError') {
        const titleError = error.errors.title ? error.errors.title.message : null;
        const authorError = error.errors.author ? error.errors.author.message : null;
        res.status(400).json({
          errors: {
            title: titleError,
            author: authorError,
          },
        });
      } else {
        res.status(400).json(error);
      }
    });
};
