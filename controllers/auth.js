const User = require('../models/User');
const passport = require('../passport/passport');

const signup = async (req, res, next) => {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;

    const user = new User({
        username: username,
        email: email
    });
    await user.setPassword('password');
    await user.save().then(result => {
        res.json({
            "status": "succes",
            "data": {
                "user": user
            }
        });
    }).catch(error => {
        res.json({
            "status": "failed",
            "message": {
                "error": error
            }
        });
    });
}

const login = async (req, res, next) =>{
    const  user  = await User.authenticate()(req.body.username, req.body.password)
    .then(result => {
        res.json({
            "status": "succes",
            "data": {
                "user": result
            }
        });
    }).catch(error => {
        res.json({
            "status": "failed",
            "message": error
        });
    });
}

module.exports.signup = signup;
module.exports.login = login;