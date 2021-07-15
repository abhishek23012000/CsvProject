/****************IMPORTING PACKAGE*******************************/
const express = require("express");

const router = express.Router();

const deleteController = require("../controller/delete_controller");

router.get("/:file", deleteController.delete);

//exporting routes
module.exports = router;
