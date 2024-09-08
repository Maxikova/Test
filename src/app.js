const express = require('express');
const morgan = require('morgan');
const app = express(); 

app.use(morgan('dev')); // Metodo dev es para ver mensajes cortos

app.use(require('./routes/index'));

module.exports = app;
//Configuras APP