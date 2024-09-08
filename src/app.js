/* const express = require('express');
const app = express();

// Ruta raíz
app.get('/', (req, res) => {
  res.status(200).send('Server is running');
});

// No usar process.exit(), simplemente cerramos el servidor si es necesario
function closeServer() {
  // Lógica para cerrar el servidor, si tienes una referencia del servidor
  // por ejemplo si haces algo como: const server = app.listen(...)
  // entonces podrías hacer: server.close();
}

module.exports = { app, closeServer }; */

const express = require('express');
const app = express();

// Ruta raíz
app.get('/', (req, res) => {
  res.status(200).send('Server is running');
});

module.exports = { app };  // Solo exportamos app
