const Leaderboard = require("../../../models/leaderboard")

const getAll =  (req, res) => {
    Leaderboard.find({}, (err, docs) => {
        if(!err) {
            res.json({
                "status": "success",
                "data": "TBC"//TBC, put data from Leaderboard.find here once this exists
            })
        }
    })
    
}

module.exports.getAll = getAll