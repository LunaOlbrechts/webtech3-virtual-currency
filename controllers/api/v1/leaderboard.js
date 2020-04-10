const Leaderboard = require("../../../models/leaderboard");

const getAll =  (req, res) => {
    Leaderboard.find({
        "place": 1
    }, (err, docs) => {
        if(!err) {
            res.json({
                "status": "success",
                "data": {
                    "score": docs
                }
            })
        }
    })
}


module.exports.getAll = getAll;
