const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    balance: Number,
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

User.plugin(passportLocalMongoose, {usernameField: 'email'});
module.exports = mongoose.model('User', User);