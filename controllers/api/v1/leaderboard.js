const Leaderboard = require("../../../models/Leaderboard");
const User = require("../../../models/User");


const getAll =  (req, res) => {
        const sortBalance = { balance: -1};
        console.log("hahaha");
        User.find().sort(sortBalance).exec( (err, result) => {
            if (err) {
                console.log("hahaha");
                return res.json({
                    "status": "failed",
                    "message": "Er is iets misgelopen met het ophalen van de users"
                });
            }
            if (!err) {
                let place= 1;
                res.json({
                    "status": "success",
                    'data': result.map(function (result) {
                        return {
                            "email": result.email,
                            "balance": result.balance,
                            "place": place++
                        }
                    })
                }); 
            }
        })
}


module.exports.getAll = getAll;
