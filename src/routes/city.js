const { Router } = require("express");
const {getAllCity} = require("../controller/city");
const { valdationJWT } = require('../middlewares/validationJWT');
const router = Router();
router.get("/",valdationJWT, getAllCity);
module.exports = router;