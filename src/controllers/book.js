const Book = require('../models/book');

exports.addBook = (req, res) => {
  const book = new Book({
    title: req.body.book.title,
    author: req.body.book.author,
    genre: req.body.book.genre,
    isbn: req.body.book.isbn,
    user: req.body.user._id,
  });

  book.save().then(() => {
    res.status(201).json(book);
  })
    .catch(error => {
      res.status(400).json(error);
    });
};
