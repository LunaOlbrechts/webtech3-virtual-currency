
const User = require("../../../models/User");
const Transfer = require("../../../models/Transfer")

const getUser = (req, res) => {
    User.find({_id: req.user._id}, (err, docs) => {
        Transfer.find({sender: docs[0].fullname}, (err, docs2) =>{
            Transfer.find({receiver: docs[0].fullname}, (err, docs3) =>{
            if(docs2 && docs3){
                res.json({
                    "status": "sucess", 
                    "user": docs[0],
                    "sentCoins": docs2,
                    "receivedCoins": docs3
                })
            }
            else if(docs2){
                res.json({
                    "status": "sucess", 
                    "user": docs[0],
                    "sentCoins": docs2
                })
            }
            else if( docs3){
                res.json({
                    "status": "sucess", 
                    "user": docs[0],
                    "receivedCoins": docs3
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
    })
}

module.exports.getUser = getUser;