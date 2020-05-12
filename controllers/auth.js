const User = require('../models/User');
const passport = require('../passport/passport');
const jwt = require('jsonwebtoken');
const config = require('config');

const signup = async (req, res, next) => {
    let email = req.body.email;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let password = req.body.password;
    let balance = 100;

    let fullname = firstname.concat(' ', lastname);
    
    const user = new User({
        email: email,
        fullname: fullname,
        balance: balance
    });

    await user.setPassword(password);
    await user.save().then(result => {

        let token = jwt.sign({
            uid: result._id
        }, config.get('jwt.secret'));

        res.json({
            "status": "succes",
            "data": {
                "token": token
            }
        });
    }).catch(error => {
        console.log(error);
        res.json({
            "status": "failed",
            "message": {
                "error": error
            }
        });
    });
}

const login = async (req, res, next) => {
    const user = await User.authenticate()(req.body.email, req.body.password).then(result => {
        if (!result.user) {
            return res.json({
                "status": "fail",
                "message": "login failed"
            });
        }

        let token = jwt.sign({
            uid: result.user._id
        }, config.get('jwt.secret'));

        return res.json({
            "status": "succes",
            "data": {
                "token": token
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