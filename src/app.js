const express = require('express');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const bookRouter = require('./routes/book');
const path = require('path');

const app = express();
app.use(express.json());

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/book', bookRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../index.html`));
});

module.exports = app;
