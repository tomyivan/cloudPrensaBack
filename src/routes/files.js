const express = require('express');
const { getContenFile, downloadFile, uploadFile,getFileAll } = require('../controller/files')
const { check } = require('express-validator');
const { validationFields } = require('../middlewares/validationFields');
const multer  = require('multer')
const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null,'public/upload')
    },
    filename: function (req, file, cb){
        cb(null,Date.now()+'-'+file.originalname)
    }
});
const upload = multer({storage:storage, limits:{fileSize:100*1024*1024}})//100 mb
const router = express.Router();
router.get('/:idFile', getContenFile)
router.get('/dowload/:idFile', downloadFile)
router.post('/upload', [ // middlewares
    upload.single('file'),
    check('journalist', 'El periodista es obligatorio').not().isEmpty(),
    check('date', 'La fecha es obligatorio').not().isEmpty(),
    check('type', 'El tipo es obligatorio').not().isEmpty(),
    check('nameFile', 'El nombre del archivo es obligatorio').not().isEmpty(),
    validationFields
], uploadFile)
router.get('/searchFile/:dateFilter/:city/:journalist?',[check('dateFilter','La fecha es obligatoria').not().isEmpty(),validationFields],getFileAll);
// router.get('/search/:nameFile',searchFile);
module.exports = router