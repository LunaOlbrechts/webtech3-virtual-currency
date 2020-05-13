
const User = require("../../../models/User");
const Transfer = require("../../../models/Transfer")

const getUser = (req, res) => {
    User.find({_id: req.user._id}, (err, docs) => {
        Transfer.find({sender: docs[0].fullname}, (err, docs2) =>{
            if(docs2){
                res.json({
                    "status": "sucess", 
                    "user": docs[0],
                    "sendedCoins": docs2
                })
            }
            else{
                res.json({
                    "status": "sucess", 
                    "user": docs[0]
                })
            }
        })
    })
}

module.exports.getUser = getUser;