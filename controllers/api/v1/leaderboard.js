const Leaderboard = require("../../../models/Leaderboard");
const User = require("../../../models/User");


const getAll =  (req, res) => {
        const sortBalance = { balance: -1};
        User.find().sort(sortBalance).exec( (err, result) => {
            if (err) {
                return res.json({
                    "status": "failed",
                    "message": "Er is iets misgelopen met het ophalen van de users"
                });
            }
            if (!err) {
                let place= 1;
                res.json({
                    "status": "success",
                    'values': result.map(function (result) {
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
