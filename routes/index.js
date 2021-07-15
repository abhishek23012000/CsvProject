const express = require("express");

const router = express.Router();
const homeController = require("../controller/home_controller");
const uploadController = require("../controller/upload_controller");
router.use("/api", require("./api"));

router.get("/", homeController.Index);
router.use("/upload", require("./upload"));
router.use("/delete", require("./delete"));

module.exports = router;
