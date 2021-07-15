const express = require("express");
const router = express.Router();

router.use("/read", require("./read"));
router.use("/delete", require("./delete"));

module.exports = router;
