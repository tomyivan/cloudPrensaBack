const { Router } = require('express');
const { check } = require('express-validator');
const { createUsser, login,refreshToken } = require('../controller/auth');

const { validationFields } = require('../middlewares/validationFields');
const { valdationJWT } = require('../middlewares/validationJWT');
const router = Router()
router.post('/',
    [
        check('user', 'El usuario es obligatorio').not().isEmpty(),
        check('pass', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validationFields
    ],
    login
);
router.post(
    '/new',
    [ // middlewares
        check('lastName', 'El apellido es obligatorio').not().isEmpty(),
        check('name', 'El nombre  es obligatorio').not().isEmpty(),
        check('user', 'El usueario es obligatorio').not().isEmpty(),
        check('pass', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validationFields
    ],
    createUsser
);
router.get('/refresh', valdationJWT, refreshToken);

module.exports = router