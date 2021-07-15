const express = require("express");
const router = express.Router();

const deleteapi = require("../../../controller/api/v1/index_api");

router.post("/:file", deleteapi.delete);

module.exports = router;
