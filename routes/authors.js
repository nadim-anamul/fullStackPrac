const express = require('express');
const Author = require('../models/author');

const router = express.Router();

// get all the authors
router.get('/', async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i');
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render('authors/index', { authors, searchOptions: req.query.name });
  } catch {
    res.redirect('/');
  }
  res.render('authors/index');
});
// new author route
router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() });
});
// create author route

router.post('/', async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    res.redirect(`authors`);
  } catch {
    res.render('authors/new', {
      author: author,
      errorMessage: 'Error creating Author',
    });
  }
});

module.exports = router;
