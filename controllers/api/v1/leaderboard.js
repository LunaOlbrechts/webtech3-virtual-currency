const Leaderboard = require("../../../models/leaderboard");

const getAll =  (req, res) => {
    PlaceInLeaderboard.find({
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

const create =  (req, res, next) => {
    let place = new PlaceInLeaderboard
    place.place = 1
    place.user = "Luna"
    place.balance = 100
    place.save((err, doc) => {
        if(err){
            res.json({
            "status": "fail", 
            "message": "could not save new leaderboard place"
            })
        }
        if(!err) {
            res.json({
                "status": "success",
                "data": {
                    "score": doc
                }
            });
        }
    });
}



module.exports.getAll = getAll;
module.exports.create = create;