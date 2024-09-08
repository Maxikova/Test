const express = require('express');
const app = express();

// Ruta raíz
app.get('/', (req, res) => {
  res.status(200).send('Server is running');
});

// Opcional: función para cerrar el servidor
function closeServer() {
  // Lógica para cerrar el servidor si es necesario
  process.exit(0); // Puedes adaptar esta lógica según cómo inicies tu servidor
}

module.exports = { app, closeServer };
