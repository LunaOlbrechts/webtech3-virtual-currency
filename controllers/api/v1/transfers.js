const getAll =  (req, res) => {
    res.json({
        "status": "success",
        "data": {
            "transactions": []
        }
    })
}

const create = (req, res) => {
    res.json({
        "status": "success",
        "data": {
            "transaction": {
                "sender": "user1",
                "amount": "a coin",
                "receiver": "user2"
            }
        }
    })
}

module.exports.getAll = getAll
module.exports.create = create