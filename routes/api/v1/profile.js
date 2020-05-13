const express = require('express');
const router = express.Router()
const profileController = require("../../../controllers/api/v1/profile")

router.get("/", profileController.getUser);

module.exports = router