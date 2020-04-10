const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const leaderboardSchema = new Schema({
    place: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const PlaceInLeaderboard = mongoose.model('PlaceInLeaderboard', leaderboardSchema);

module.exports = Leaderboard