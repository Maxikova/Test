/* // Lo usas a app
const app = require('./app');

async function main(){

    app.listen(3000);
    console.log('Server is running');
}

main();
 */
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Server is running');
});

module.exports = { app };
