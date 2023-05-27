const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos } = require('../middlewares');

const {resenasGet, resenasPost } = require('../controllers/resenas');

const router = Router();

/**
 * {{url}}/api/resenas
 */

//  Obtener todas las categorias - publico
router.get('/', resenasGet);



// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [ 
    check('descripcion','la descripcion es obligatoria').not().isEmpty(),
    check('direccion','la descripcion es obligatoria').not().isEmpty(),
    check('usuario','la descripcion es obligatoria').not().isEmpty(),
    check('worker','la descripcion es obligatoria').not().isEmpty(),
    validarCampos
], resenasPost );




module.exports = router;