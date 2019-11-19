const express = require('express');

const app = express();

const quotes = require('./quotes/quotes.json');

app.listen(5000, () => {
	console.log('Server running on port 5000');
});

app.get('/random', (req, res) => {
	var randomIndex = Math.floor(Math.random() * quotes.length);
	res.send(quotes[randomIndex]);
});

app.get('/filter', (req, res) => {
	res.send('Quote filter goes here');
});
