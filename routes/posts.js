const { Router } = require('express');

const { postsGet,
        postsPost,
        postsDelete} = require('../controllers/posts');
const { check } = require('express-validator');

const {esRoleValido, emailExiste, existeUsuarioPorId} = require ('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');
const e = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();


router.get('/', postsGet );


router.post('/',[
    validarJWT
], postsPost );

router.delete('/:id',[
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], postsDelete );







module.exports = router;