const User = require('../models/User');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken')
require('dotenv').config();

const utils = require('../utils/index')
const secret = process.env.JWT_SECRET;

const {retErr} = require('../utils/index');

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return  retErr(res, errors, 418, 'INVALID_INPUT');
    }
    const {userName, password} = req.body;
    const user = await User.findOne({userName: userName});
    if (user && user.userName) {
        const isPasswordMatched = await user.comparePassword(password);
        if (isPasswordMatched) {
            // Sign token
            const token = jwt.sign({userName: userName}, secret,
                {
                    expiresIn: 86400,
                });
            const userToReturn = {...user.toJSON(), ...{token}};
            delete userToReturn.password;
            res.status(200).json(userToReturn);
        } else {
            return  retErr(res, {}, 418, 'WRONG_USER_OR_PW');
        }
    } else {
        return  retErr(res, {}, 418, 'WRONG_USER_OR_PW');
    }
}

exports.whoAmI = async (req, res) => {
    let user = await User.findOne({_id: req.user._id })
    return res.status(200).json({data: user})
}
