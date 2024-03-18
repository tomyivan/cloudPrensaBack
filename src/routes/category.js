const express = require('express');
const { getAllCategory, getCategoryContent,addCategory, updateCategory } = require('../controller/folders');
const { check } = require('express-validator');
const router = express.Router();
router.post('/', getAllCategory)
router.get('/:idCategory', getCategoryContent)

// router.post(
//     '/new',
//     [
//         check('idClasificadorComunTipo', 'El idClasificadorComunTipo es obligatorio').not().isEmpty(),
//         check('nombre', 'El nombre es un campo obligatorio').not().isEmpty(),
//         validarCampos
//     ],
//     crearClasificadorComun
// );
router.post('/new', addCategory)
router.put('/update',updateCategory)
module.exports = router