const Transfer = require("../../../models/Transfer")
const User = require('../../../models/User');

const getAll =  (req, res) => {
    Transfer.find({}, (err, docs) => {
        if(!err) {
            res.json({
                "status": "success",
                "data": {
                    "transactions": docs
                }
            })
        }
    })
    
}

const create = (req, res, next) => {
    let transfer = new Transfer()
    transfer.sender = /*req.user.email*/ "test@test.com", //change to res.user.email once authentication works
    transfer.amount = req.body.amount,
    transfer.receiver = req.body.receiver

    User.find({email : transfer.receiver}, (err, docs) => {
        
        User.find({email: transfer.sender}, (err2,docs2) => {
            console.log(docs)
            console.log(docs2[0].balance)

            if(docs2[0].balance >= transfer.amount) {
                if(docs.length) {
                    transfer.save( (err, doc) => {
                        if(err) {
                            res.json({
                                "status": "error",
                                "message": "Could not transfer the coins",
                            })
                        }
                
                        if(!err) {
                            res.json({
                                "status": "success",
                                "data": {
                                    "transaction": doc,
                                }
                            })
                        }
                    })
        
                }else {
                    res.json({
                        "status": "error",
                        "message": "Could not find the user you want to tranfser coins to",
                    })
                }
            }else {
                res.json({
                    "status": "error",
                    "message": "insufficient balance",
                })
            }
        })      
    })
}

module.exports.getAll = getAll
module.exports.create = create