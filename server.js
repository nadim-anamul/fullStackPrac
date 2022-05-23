if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts');
const port = process.env.PORT || 3000;
const indexRoute = require('./routes/index');
const authorRoute = require('./routes/authors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayout);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: 'mb', extended: false }));
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to mongo'));

app.use('/', indexRoute);
app.use('/authors', authorRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
