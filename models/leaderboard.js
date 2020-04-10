const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const leaderboardSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

module.exports = Leaderboard