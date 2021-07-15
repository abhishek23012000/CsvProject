/****************IMPORTING PACKAGE*******************************/
const express = require("express");

const router = express.Router();

// import controllerss
const fileController = require("../controller/file_controller");

router.get("/:file", fileController.View);

module.exports = router;
