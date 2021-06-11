const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');
const router = new Router();


router.get('/', usuariosGet );

router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut );

router.post('/',[
    check('nombre' , 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser mas de 6 letras').isLength({ min: 6 }),
    check('correo').custom(emailExiste),
    //check('correo', 'El correo no es valido').isEmail(),
    //check('rol' , 'No es un rol valido').isIn(['ADMIN' , 'USER']),
    //ahora vamos a validar el rol contra la bd
    check('rol').custom(esRolValido),
        validarCampos
    ] , usuariosPost );

router.delete('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete );


module.exports = router;