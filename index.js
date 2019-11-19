const express = require('express');

const app = express();

const QUOTES = require('./quotes/quotes.json');

app.listen(5000, () => {
	console.log('Server running on port 5000');
});

app.get('/random', (req, res) => {
	let randomIndex = Math.floor(Math.random() * QUOTES.length);
	res.send(QUOTES[randomIndex]);
});

app.get('/filter/:keyword', (req, res) => {
	let keyword = req.params.keyword.toLowerCase();

	let filteredList = QUOTES.filter(item => {
		item.quoteText.toLowerCase().search(keyword) === -1;
	});

	res.send(filteredList);
});
