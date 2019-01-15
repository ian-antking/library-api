const express = require('express');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const bookRouter = require('./routes/book');

const app = express();
app.use(express.json());

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/book', bookRouter);

module.exports = app;
