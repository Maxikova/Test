const test = require('ava');
const request = require('supertest');
const server = require('./index2');

test.after.always(async t => {
  server.close(); // Esto es para cerrar el servidor cuando finaliza el test
});

// Test de prueba del servidor
test('GET / - Verifico que el servidor funcione y responda con un 200', async t => {
  const response = await request(server).get('/');
  t.is(response.status, 200);
  t.is(response.text, 'La API esta corriendo en el puerto 3000');
});

// Test para obtener los vinos

test('GET /v1/vinos - Obtengo todos los vinosz', async t => {
  const response = await request(server).get('/v1/vinos');
  t.is(response.status, 200);
  t.true(Array.isArray(response.body));
});

// Test obtiene un ID de vino
test('GET /v1/vinos/:id - Otbengo un vino por ID', async t => {
  const response = await request(server).get('/v1/vinos/1');
  t.is(response.status, 200);
  t.is(response.body.id, 1);
});

//Test de obtener clientes y devuelve un array.
test('GET /v1/clientes - Obtener todos los clientes', async t => {
  const response = await request(server).get('/v1/clientes');
  t.is(response.status, 200);
  t.true(Array.isArray(response.body)); 
});
