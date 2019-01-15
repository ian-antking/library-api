const faker = require('faker');

exports.user = (options = {}) => ({
  firstName: options.firstName || faker.name.firstName(),
  lastName: options.lastName || faker.name.lastName(),
  email: options.email || faker.internet.email(),
  password: options.password || faker.internet.password(),
});

exports.book = (options = {}) => ({
  title: options.title || faker.lorem.words(),
  author: options.author || faker.name.findName(),
  genre: options.genre || faker.commerce.department(),
  isbn: options.isbn || faker.random.number(),
});
