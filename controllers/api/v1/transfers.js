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
                    let oldBalanceSender = docs2[0].balance
                    let newBalanceSender = oldBalanceSender - transfer.amount
                    User.findOneAndUpdate({email: transfer.sender}, {balance: newBalanceSender}, (err,docs) => {
                        //console.log(oldBalanceSender)
                        //console.log(newBalanceSender)
                        //console.log(docs)
                    })

                    let oldBalanceReceiver = docs[0].balance
                    let newBalanceReveiver = oldBalanceReceiver + transfer.amount
                    User.findOneAndUpdate({email: transfer.receiver}, {balance: newBalanceReveiver}, (err,docs) => {
                        //console.log(oldBalanceReceiver)
                        //console.log(newBalanceReveiver)
                        //console.log(docs)
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