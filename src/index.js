// Lo usas a app
const app = require('./app');

async function main(){

    app.listen(3000);
    console.log('Server is running');
}

main();