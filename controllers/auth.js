const User = require('../models/User');
const passport = require('../passport/passport');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    let balance = 0;

    const user = new User({
        email: email,
        balance: balance
    });
    await user.setPassword(password);
    await user.save().then(result => {
        let token = jwt.sign({
            uid: result._id
        }, "MdPa0ùecv");
        res.json({
            "status": "succes",
            "data": {
                "token": token,
                "result": result
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

const login = async (req, res, next) =>{
    const  user  = await User.authenticate()(req.body.email, req.body.password).then(result => {
        if(!result.user){
           return res.json({
                "status": "fail",
                "message": "login failed"
            });
        }

        let token = jwt.sign({
            uid: result.user._id
        }, "MdPa0ùecv");

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