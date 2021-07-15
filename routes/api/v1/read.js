const express = require("express");

const router = express.Router();

const postsApi = require("../../../controller/api/v1/index_api");

router.post("/create", postsApi.Upload);
router.get("/", postsApi.allfiles);

module.exports = router;
