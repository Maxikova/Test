/* const test = require('ava');
const request = require('supertest');
const { app, closeServer } = require('./app');

// Cerrar el servidor después de las pruebas
test.after.always(async t => {
  closeServer();  // Esta función no hará process.exit() ahora
});

// Verificar que el servidor esté ejecutándose y responda "Server is running"
test("GET / - Verificar que el servidor esté corriendo y responda con el mensaje 'Server is running'", async t => {
  const response = await request(app).get('/');
  
  // Verificar que el código de estado sea 200
  t.is(response.status, 200);
  
  // Verificar que el cuerpo de la respuesta sea "Server is running"
  t.is(response.text, 'Server is running');
}); */




const test = require('ava');
const request = require('supertest');
const { app } = require('./src/app');  // Solo requerimos app

// Verificar que el servidor esté ejecutándose y responda "Server is running"
test("GET / - Verificar que el servidor esté corriendo y responda con el mensaje 'Server is running'", async t => {
  const response = await request(app).get('/');
  
  // Verificar que el código de estado sea 200
  t.is(response.status, 200);
  
  // Verificar que el cuerpo de la respuesta sea "Server is running"
  t.is(response.text, 'Server is running');
});
