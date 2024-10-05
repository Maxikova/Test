const express = require('express');
const servicioVinos = require('./ServicioVinos');
const ServicioClientes = require('./ServicioClientes');
//const ServicioEmpleados = require('./Entidades/ServicioEmpleados');
const ServicioVentas = require('./ServicioVentas');
const wrap = require('co-express');
const moment = require('moment');
const app = express();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
app.use(express.json());

app.use(cors());

const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'API de mi Vinoteca',
        version: '1.0.0',
        description: 'Documentación de la API para la gestión de vinos, clientes y ventas de la vinoteca',
        contact: {
          name: 'Vinos Finos',
          email: 'info@vinosfinos.com'
        }
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Servidor de desarrollo'
        }
      ]
    },
    apis: ['./index2.js']
  };

  const swaggerDocs = swaggerJSDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Endpoint generico, el primero

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});

///Endpoints para el manejo de los vinos

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
        let vinos = await service.deleteById(req.params.id);
        res.json(vinos);
    } catch (error) {
        res.status(404).send('Vino no encontrado');
    }
});


///Endpoints para el manejo de los clientes

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


app.post('/v1/clientes', async (req, res) => {
    const {nombre, sexo} = req.query;
    if (!nombre || !sexo )
    {
        return res.status(400).send('Faltan datos del cliente');
    }
    let nuevoCliente = await ServicioClientes.add(req.query); 
    res.status(201).send("Cliente creado correctamente");
});

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
app.get('/v1/ventas', async (req, res) => {
    let ventas = await ServicioVentas.getAll();
    res.json(ventas);
});

//Obtener venta por ID
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

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});