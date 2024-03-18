const { Router } = require('express');
const { check } = require('express-validator');
const { getAllUser } = require('../controller/user');

const { validationFields } = require('../middlewares/validationFields');
const { valdationJWT } = require('../middlewares/validationJWT');
const router = Router()
router.get('/',
    valdationJWT,
    getAllUser
);
module.exports = router