const express = require('express');
const Book = require('../models/book');
const Author = require('../models/author');

const router = express.Router();

// get all the books
router.get('/', async (req, res) => {
  res.send('All Books');
});
// new book route
router.get('/new', async (req, res) => {
  try {
    const authors = await Author.find({});
    const book = new Book();
    res.render('books/new', {
      authors,
      book,
    });
  } catch (error) {
    res.redirect('/books');
  }
});
// create book route

router.post('/', async (req, res) => {
  res.send('Create Book');
});

module.exports = router;
