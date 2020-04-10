const express = require('express')
const router = express.Router()
const leaderboardController = require("../../../controllers/api/v1/leaderboard")

/* GET /api/v1/leaderboard */
router.get("/", leaderboardController.getAll)
router.post("/", leaderboardController.create)


module.exports = router