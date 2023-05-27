const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { crearCategoria, obtenerCategorias,obtenerUnaCategoria}  = require('../controllers/categorias')


const router = Router();

//obtener todas las categorias
router.get('/', obtenerCategorias);

//obtner una categorias por id
router.post('/buscarCategoria', [ 
    check('name','El nombre es obligatorio al buscar').not().isEmpty(),
    validarCampos
],obtenerUnaCategoria);

//Crear categoria
router.post('/',[ 
    check('name','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//Actualizar categoria
router.put('/:id', (req,res)=>{
    res.json("put");
});

//Borrar categoria
router.delete('/:id', (req,res)=>{
    res.json("delete");
});
module.exports = router;