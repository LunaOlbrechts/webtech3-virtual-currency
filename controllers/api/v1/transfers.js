const Transfer = require("../../../models/Transfer")

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
    transfer.sender = req.body.sender,
    transfer.amount = req.body.amount,
    transfer.receiver = req.body.receiver

    transfer.save( (err, doc) => {
        if(err) {
            res.json({
                "status": "error",
                "message": "Could not transfer the coins"
            })
        }

        if(!err) {
            res.json({
                "status": "success",
                "data": {
                    "transaction": doc
                }
            })
        }
        
    })
}

module.exports.getAll = getAll
module.exports.create = create