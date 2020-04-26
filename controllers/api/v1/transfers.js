const Transfer = require("../../../models/Transfer")
const User = require('../../../models/User');

const getAll =  (req, res) => {
    Transfer.find({$or: [{ sender: req.user.email }, { receiver: req.user.email }]}, (err, docs) => {
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

//GET ONE MESSAGE
const getUser = (req, res) => {
    User.find({_id: req.user._id}, (err, docs) => {
        res.json({
            "status": "success",
            "user": docs[0]
        })
    }) 
}


const create = (req, res, next) => {
    let transfer = new Transfer()
    transfer.sender = req.user.email,
    transfer.amount = req.body.amount,
    transfer.receiver = req.body.receiver

    User.find({email: transfer.receiver}, (err, docs) => {
        User.find({email: transfer.sender}, (err2,docs2) => {
            
            if(docs[0].email == docs2[0].email) {
                res.json({
                    "status": "error",
                    "message": "je kan geen coins naar jezelf sturen",
                })
            }else {
                if(docs2[0].balance >= transfer.amount) {
                    if(docs.length) {
                        transfer.save( (err, doc) => {
                            if(err) {
                                res.json({
                                    "status": "error",
                                    "message": "Er is iets misgelopen, de coins zijn niet verstuurd",
                                })
                            }
                    
                            if(!err) {
                                res.json({
                                    "status": "success",
                                    "message": "Coins verstuurd",
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
                            "message": "De user waar je coins naar wilde sturen is niet gevonden",
                        })
                    }
                }else {
                    res.json({
                        "status": "error",
                        "message": "je balans is niet groot genoeg",
                    })
                }
            }
        })      
    })
}

module.exports.getAll = getAll
module.exports.getUser = getUser
module.exports.create = create