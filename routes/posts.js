const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//Obtener todos los posts
router.get('/', (req,res)=>{
    res.json("todo OK");
});

//Crear posts
router.post('/', (req,res)=>{
    res.json("post");
});

//Crear posts
router.delete('/', (req,res)=>{
    res.json("delete");
});


module.exports = router;