const test = require('ava');
const request = require('supertest');
const server = require('./index');

// Cerrar el servidor después de las pruebas
test.after.always(async t => {
  server.close();  // Cerramos el servidor después de cada test
});

// Prueba para verificar que el servidor responda correctamente
test('GET / - Verificar que el servidor esté corriendo y responda con el mensaje "Server is running"', async t => {
  const response = await request(server).get('/');
  t.is(response.status, 200);
  t.is(response.text, 'Server is running');
});

