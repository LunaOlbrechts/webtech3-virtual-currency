const Transfer = require("../../../models/Transfer")
const User = require('../../../models/User');

const getAll =  (req, res) => {
    Transfer.find({$or: [{ sender: req.user.fullname }, { receiver: req.user.fullname }]}, (err, docs) => {
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

const getUser = (req, res) => {
    User.find({_id: req.user._id}, (err, docs) => {
        res.json({
            "status": "success",
            "user": docs[0]
        })
    }) 
}

const getAllUsers = (req, res) => {
    User.find({}, (err,docs) => {
        res.json({
            "status": "success",
            "users": docs
        })
    })
}

const create = (req, res, next) => {
    let transfer = new Transfer()
    transfer.sender = req.user.fullname,
    transfer.amount = req.body.amount,
    transfer.reason = req.body.reason,
    transfer.comment = req.body.comment,
    transfer.receiver = req.body.receiver

    User.find({fullname: transfer.receiver}, (err, docs) => {
        User.find({fullname: transfer.sender}, (err2,docs2) => {
            if(docs[0] == null) {
                res.json({
                    "status": "error",
                    "message": "De user waar je coins naar wilde sturen is niet gevonden",
                })
            } else {
                if(docs[0].fullname == docs2[0].fullname) {
                    res.json({
                        "status": "error",
                        "message": "je kan geen coins naar jezelf sturen",
                    })
                }else {
                    if(docs2[0].balance >= transfer.amount) {
                        if(transfer.amount == 0) {
                            res.json({
                                "status": "error",
                                "message": "je moet meer dan 0 coins per keer sturen.",
                            })
                        }else {
                            let stringers = transfer.amount
                            let substring = "-"
                            if(stringers < 0) {
                                res.json({
                                    "status": "error",
                                    "message": "je kan geen negatieve bedragen sturen!",
                                })
                            }else {
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
                                    User.findOneAndUpdate({fullname: transfer.sender}, {balance: newBalanceSender}, (err,docs) => {
                                    })
                
                                    let oldBalanceReceiver = docs[0].balance
                                    let newBalanceReveiver = oldBalanceReceiver + transfer.amount
                                    User.findOneAndUpdate({fullname: transfer.receiver}, {balance: newBalanceReveiver}, (err,docs) => {
                                    })
                        
                                }else {
                                    res.json({
                                        "status": "error",
                                        "message": "De user waar je coins naar wilde sturen is niet gevonden",
                                    })
                                }
                            } 
                        }
                        
                    }else {
                        res.json({
                            "status": "error",
                            "message": "je balans is niet groot genoeg",
                        })
                    }
                }
            }
                
        })      
    })
}

const getTransfer  = (req, res) => {
    Transfer.findOne({_id: req.params.id}, (err, docs) => {
        res.json({
            "status": "success",
            "transfer": docs
        })
    }) 
}

module.exports.getAll = getAll
module.exports.getUser = getUser
module.exports.getAllUsers = getAllUsers
module.exports.create = create
module.exports.getTransfer = getTransfer