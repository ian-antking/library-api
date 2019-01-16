const mongoose = require('mongoose');
const app = require('./src/app');

const port = process.env.PORT || 4000;

mongoose.connect(process.env.DATABASE_CONN, { useNewUrlParser: true }, () => {
  app.listen(port);
});
