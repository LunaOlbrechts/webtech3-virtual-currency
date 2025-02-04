var express = require('express')
var router = express.Router()
var transfersController = require("../../../controllers/api/v1/transfers")

/* POST /api/v1/transfers */
router.post("/", transfersController.create)

/* GET /api/v1/transfers */
router.get("/", transfersController.getAll)

/* GET /api/v1/transfers/balance */
router.get("/user", transfersController.getUser)

/* GET /api/v1/transfers/allUsers */
router.get("/allUsers", transfersController.getAllUsers)

router.get("/:id", transfersController.getTransfer)
  
module.exports = router