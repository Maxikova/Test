// Lo usas a app
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Server is running');
});

module.exports = { app };
