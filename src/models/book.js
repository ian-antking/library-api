const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: String,
  isbn: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

const Book = mongoose.model('book', bookSchema);

module.exports = Book;
