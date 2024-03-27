const { Router } = require("express");
const { getAllJournalist, addJournalist } = require("../controller/journalist");
const { valdationJWT } = require("../middlewares/validationJWT");
const { check } = require("express-validator");
const { validationFields } = require("../middlewares/validationFields");
const router = Router();
router.get("/", valdationJWT, getAllJournalist);
router.post(
  "/addJournalist",
  [
    check("name", "el nombre es obligatorio").not().isEmpty(),
    validationFields,
    valdationJWT,
  ],
  addJournalist
);
module.exports = router;
