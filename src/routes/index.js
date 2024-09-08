const {Router} = require('express');
const router = Router(); // Es para las rutas

router.get('/' , (req,res) => res.json({message : 'Hello world'}));

module.exports = router; 