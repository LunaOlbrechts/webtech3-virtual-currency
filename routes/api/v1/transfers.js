var express = require('express')
var router = express.Router()
var transfersController = require("../../../controllers/api/v1/transfers")

/* POST /api/v1/transfers */
router.post("/", transfersController.create)

/* GET /api/v1/transfers */
router.get("/", transfersController.getAll)
  
module.exports = router