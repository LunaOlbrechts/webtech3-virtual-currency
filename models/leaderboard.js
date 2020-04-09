const mongoose = require('mongoose')
const Schema = mongoose.Schema
const leaderboardSchema = new Schema({
    user: { // maybe change user to firstname and lastname? or email?,...
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
})
const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema)

module.exports = Leaderboard