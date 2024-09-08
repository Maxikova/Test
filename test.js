const test = require('ava');
const request = require('supertest');
const { app, closeServer } = require('./index');

test.after.always(async t => {
  closeServer();
});