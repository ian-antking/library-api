const express = require('express');
const bookController = require('../controllers/book');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, bookController.addBook);
router.get('/', bookController.getBooks);

module.exports = router;
