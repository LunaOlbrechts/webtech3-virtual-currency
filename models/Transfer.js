const mongoose = require('mongoose')
const Schema = mongoose.Schema
const transferSchema = new Schema({
    sender: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
})
const Transfer = mongoose.model('Transfer', transferSchema)

module.exports = Transfer