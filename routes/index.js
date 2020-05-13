var express = require('express')
var router = express.Router()
const app = express()
const apiV1LeaderboardRouter = require("./api/v1/leaderboard")

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' })
});

app.use('api/v1/leaderboard', apiV1LeaderboardRouter);

module.exports = router;
