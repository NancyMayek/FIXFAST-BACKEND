
const { Router } = require('express');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/users');
const { check } = require('express-validator');

const {esRoleValido, emailExiste, existeUsuarioPorId} = require ('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');
const e = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();


router.get('/', usuariosGet );

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('role').custom(esRoleValido),
    validarCampos
],usuariosPut );

router.post('/',[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').not().isEmpty(),
    check('role','El role es obligatorio').not().isEmpty(),
    //check('role','El role no es valido').isIn(['USER_ROLE', 'WORKER_ROLE']),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(emailExiste),
    check('role').custom( esRoleValido),
    
    validarCampos

], usuariosPost );

router.delete('/:id',[
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;