const express = require('express');
const app = express();

// Ruta raíz
app.get('/', (req, res) => {
  res.status(200).send('Server is running');
});

// Iniciar el servidor
const server = app.listen(3000, () => {
  console.log('Server is running on port 4000');
});
  

// Exportar el servidor para las pruebas
module.exports = server;
