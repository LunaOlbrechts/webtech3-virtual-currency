var express = require('express')
var router = express.Router()
var leaderboardController = require("../../../controllers/api/v1/leaderboard")


/* GET /api/v1/leaderboard */
router.get("/", leaderboardController.getAll)

module.exports = router