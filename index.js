const express = require('express');
const app = express();
const QUOTES = require('./quotes/quotes.json');

const requireToken = require('./middlewares/requireToken');

const filterListByKeyword = (keyword) => QUOTES.filter(item =>
    item.quoteText.toLowerCase().search(keyword) !== -1 || 
    item.quoteAuthor.toLowerCase().search(keyword) !== -1);

const shuffle = (array) => array.sort(() => Math.random() - 0.5);

const random = (array) => shuffle(array)[0];

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

app.get('/random/:token', requireToken, (req, res) => {
  let randomIndex = Math.floor(Math.random() * QUOTES.length);
  res.send(QUOTES[randomIndex]);
});

app.get('/filter/:token', requireToken, (req, res) => {
  const keyword = req.query.keyword.toLowerCase();
  const filteredList = filterListByKeyword(keyword);

  if (req.query.random) res.send(random(filteredList));
  else res.send(filteredList);
});
