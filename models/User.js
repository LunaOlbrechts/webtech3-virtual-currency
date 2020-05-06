const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    balance: Number,
    firstname: {
        type: String, 
        required: true
    }, 
    lastname: {
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