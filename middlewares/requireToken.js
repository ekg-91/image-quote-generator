module.exports = (req, res, next) => {
  const TOKEN = 'QhYpswedg8';

  if (req.params.token !== TOKEN) {
    return res.status(400).send({ error: 'Incorrect or missing API token' });
  }

  next();
};
