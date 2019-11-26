const express = require('express');
const app = express();
const QUOTES = require('./quotes/quotes.json');
const requireToken = require('./middlewares/requireToken');

const filterListByKeyword = (keyword) => QUOTES.filter(item =>
  item.quoteText.toLowerCase().search(keyword) !== -1 ||
    item.quoteAuthor.toLowerCase().search(keyword) !== -1);

const shuffle = (array) => array.sort(() => Math.random() - 0.5);

const random = (array) => shuffle(array)[0];

const paginate = (array, page, per_page) => {
  page = page || 1;
  per_page = per_page || 10;
  const offset = (page - 1) * per_page;

  const paginated = array.slice(offset).slice(0, per_page);
  const total_pages = Math.ceil(array.length / per_page);

  return {
    page: page,
    per_page: per_page,
    pre_page: page - 1 ? page - 1 : null,
    next_page: (total_pages > page) ? page + 1 : null,
    total: array.length,
    total_pages: total_pages,
    data: paginated
  };
};

// Run the server only if not testing
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  // console.log(JSON.stringify(process.env, null, 2));
  console.log(`Server running on port ${PORT}`);
});

app.get('/random/:token', requireToken, (req, res) => {
  const randomIndex = Math.floor(Math.random() * QUOTES.length);
  res.send(QUOTES[randomIndex]);
});

app.get('/filter/:token', requireToken, (req, res) => {
  const keyword = req.query.keyword.toLowerCase();
  const pageNum = req.query.pageNum;
  const filteredList = filterListByKeyword(keyword);
  const paginatedList = paginate(filteredList, pageNum);

  if (req.query.random && !pageNum) res.send(random(filteredList));
  else if (!pageNum) res.send(filteredList);
  else res.send(paginatedList);
});

module.exports = {
  shuffle,
  random,
  paginate,
  filterListByKeyword,
  server
};
