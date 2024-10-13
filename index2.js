//Entidades
const servicioVinos = require('./ServicioVinos');
const ServicioClientes = require('./ServicioClientes');
const ServicioVentas = require('./ServicioVentas');

//Librerias
const express = require('express');
const app = express();
const cors = require('cors');

//Newrelic
require('newrelic');

//Variables Swagger
const swaggerInfo = require('./SwaggerInfo');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = swaggerJSDoc(swaggerInfo);

app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


//Endpoint generico
app.get('/', (req, res) => {
    res.status(200).send('La API esta corriendo en el puerto 3000');
});

// Obtener todos los vinos

/**
 * @swagger
 * /v1/vinos:
 *   get:
 *     summary: Obtener todos los vinos
 *     tags: [Vinos]
 *     responses:
 *       200:
 *         description: Lista de vinos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   marca:
 *                     type: string
 *                   bodega:
 *                     type: string
 *                   año:
 *                     type: integer
 *                   precio:
 *                     type: number
 */
app.get('/v1/vinos', async (req, res) => {
    let vinos = await servicioVinos.getAll();
    res.json(vinos);
});

/**
 * @swagger
 * /v1/vinos/{id}:
 *   get:
 *     summary: Obtener vino por ID
 *     tags: [Vinos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del vino
 *     responses:
 *       200:
 *         description: Vino encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 marca:
 *                   type: string
 *                 bodega:
 *                   type: string
 *                 año:
 *                   type: integer
 *                 precio:
 *                   type: number
 *       404:
 *         description: Vino no encontrado
 */
// Obtener vino por ID
app.get('/v1/vinos/:id', async (req, res) => {
    try {
        let vinos = await servicioVinos.getById(req.params.id); 
        res.json(vinos);
    } catch(err) {
        console.log(err);
        res.status(404).end();
    }
});

/**
 * @swagger
 * /v1/vinos:
 *   post:
 *     summary: Crear un nuevo vino
 *     tags: [Vinos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               marca:
 *                 type: string
 *               bodega:
 *                 type: string
 *               año:
 *                 type: integer
 *               precio:
 *                 type: number
 *     responses:
 *       201:
 *         description: Vino creado correctamente
 *       400:
 *         description: Faltan datos del vino
 */

app.post('/v1/vinos', async (req, res) => {
    const {marca, bodega, año, precio} = req.query;
    if (!marca || !bodega || !año || !precio)
    {
        return res.status(400).send('Faltan datos del vino');
    }
    let nuevoVino = await servicioVinos.add(req.query); 
    res.status(201).send("Vino creados correctamente");
});

// Actualizar un vino
/**
 * @swagger
 * /v1/vinos/{id}:
 *   put:
 *     summary: Actualizar un vino existente por ID
 *     tags: [Vinos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del vino a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               marca:
 *                 type: string
 *               bodega:
 *                 type: string
 *               año:
 *                 type: integer
 *               precio:
 *                 type: number
 *     responses:
 *       200:
 *         description: Vino actualizado correctamente
 *       404:
 *         description: Vino no encontrado
 */
app.put('/v1/vinos/:id', async (req, res) => {
    const idVino = req.params.id;
    let VinoActualizar = await servicioVinos.getById(idVino);
    const{marca,bodega,año,precio} = req.body; // Es el body
    if(marca) VinoActualizar.marca = marca;
    if(bodega) VinoActualizar.bodega = bodega;
    if(año) VinoActualizar.año = año;
    if(precio) VinoActualizar.precio = precio;
    let Vino_Actualizado = await servicioVinos.update(VinoActualizar);
    res.status(201).send('Vino actualizado correctamente');
});

// Eliminar un vino por ID
/**
 * @swagger
 * /v1/vinos/{id}:
 *   delete:
 *     summary: Eliminar un vino por ID
 *     tags: [Vinos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del vino
 *     responses:
 *       204:
 *         description: Vino eliminado correctamente
 *       404:
 *         description: Vino no encontrado
 */
app.delete('/v1/vinos/:id', async (req, res) => {
    try {
        let vinos = await servicioVinos.deleteById(req.params.id);
        res.status(204).json(vinos);
    } catch (error) {
        res.status(404).send('Vino no encontrado');
    }
});

// Obtener todos los clientes
/**
 * @swagger
 * /v1/clientes:
 *   get:
 *     summary: Obtener todos los clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   sexo:
 *                     type: string
 */
app.get('/v1/clientes', async (req, res) => {
    let clientes = await ServicioClientes.getAll();
    res.json(clientes);
});

// Obtener clientes por ID
/**
 * @swagger
 * /v1/clientes/{id}:
 *   get:
 *     summary: Obtener cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 sexo:
 *                   type: string
 *       404:
 *         description: Cliente no encontrado
 */
app.get('/v1/clientes/:id', async (req, res) => {
    try {
        let clientes = await ServicioClientes.getById(req.params.id); 
        res.json(clientes);
    } catch(err) {
        console.log(err);
        res.status(404).end();
    }
});

/**
 * @swagger
 * /v1/clientes:
 *   post:
 *     summary: Crear un nuevo cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre del cliente
 *       - in: query
 *         name: sexo
 *         schema:
 *           type: string
 *         required: true
 *         description: Sexo del cliente
 *     responses:
 *       201:
 *         description: Cliente creado correctamente
 *       400:
 *         description: Faltan datos del cliente
 */

app.post('/v1/clientes', async (req, res) => {
    const {nombre, sexo} = req.query;
    if (!nombre || !sexo )
    {
        return res.status(400).send('Faltan datos del cliente');
    }
    let nuevoCliente = await ServicioClientes.add(req.query); 
    res.status(201).send("Cliente creado correctamente");
});


/**
 * @swagger
 * /v1/clientes/{id}:
 *   put:
 *     summary: Actualizar un cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               sexo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente actualizado correctamente
 *       404:
 *         description: Cliente no encontrado
 */

// Actualizar datos de un cliente
app.put('/v1/clientes/:id', async (req, res) => {
    const idCliente = req.params.id;
    let clienteActualizar = await ServicioClientes.getById(idCliente);
    const{nombre,sexo} = req.body; // Es el body
    if(nombre) clienteActualizar.nombre = nombre;
    if(sexo) clienteActualizar.sexo = sexo;
    let Cliente_Actualizado = await servicioVinos.update(clienteActualizar);
    res.status(201).send('Vino actualizado correctamente');
});

// Eliminar un cliente por ID

/**
 * @swagger
 * /v1/clientes/{id}:
 *   delete:
 *     summary: Eliminar un cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente eliminado correctamente
 *       404:
 *         description: Cliente no encontrado
 */
app.delete('/v1/clientes/:id', async (req, res) => {
    try {
        let clientes = await service.deleteById(req.params.id);
        res.json(clientes);
    } catch (error) {
        res.status(404).send('Cliente no encontrado');
    }
    // ServicioClientes.deleteById(req.params.id);
    // res.status(204).end();
});

// Obtener todas las ventas
/**
 * @swagger
 * /v1/ventas:
 *   get:
 *     summary: Obtener todas las ventas
 *     tags: [Ventas]
 *     responses:
 *       200:
 *         description: Lista de ventas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   clienteId:
 *                     type: integer
 *                   total:
 *                     type: number
 *                     format: float
 */

app.get('/v1/ventas', async (req, res) => {
    let ventas = await ServicioVentas.getAll();
    res.json(ventas);
});

//Obtener venta por ID

/**
 * @swagger
 * /v1/ventas/{id}:
 *   get:
 *     summary: Obtener una venta por ID
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la venta
 *     responses:
 *       200:
 *         description: Detalles de la venta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 clienteId:
 *                   type: integer
 *                 total:
 *                   type: number
 *                   format: float
 *       404:
 *         description: Venta no encontrada
 */

app.get('/v1/ventas/:id' , async(req,res) =>{
    try{
        let ventas = await ServicioVentas.getById(req.params.id);
        res.json(ventas);
    }
    catch(err){
        console.log(err);
        res.status(404).end();
    }

});

//Agregar Ventas
app.post('/v1/ventas', async (req, res) => {
    const { id_cliente, id_vino } = req.body;

    // Imprimir el cuerpo de la solicitud para depuración
    console.log(req.body);

    if (!id_vino || !id_cliente) {
        return res.status(400).send('No están todos los datos para concretar la venta');
    }

    try {
        const vino = await servicioVinos.getById(id_vino);
        if (!vino) {
            return res.status(404).send('ID de vino no encontrado');
        }

        const cliente = await ServicioClientes.getByDNI(id_cliente);
        if (!cliente) {
            return res.status(404).send('ID de cliente no encontrado');
        }

        // Aquí agregamos la venta
        await ServicioVentas.addVenta(id_vino, id_cliente);

        res.status(201).send('Se registró la venta');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});


const PORT = 3000;
const server = app.listen(PORT, () => {
    console.log(`La API esta corriendo en el puerto ${PORT}`);
});

module.exports = server;