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
    reason: {
        type: String, 
        required: true
    },
    comment: {
        type: String,
        required: false
    },
    receiver: {
        type: String,
        required: true
    },
})
const Transfer = mongoose.model('Transfer', transferSchema)

module.exports = Transfer