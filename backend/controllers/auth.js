const User = require('../models/User');
const Token = require('../models/unused/Token');
//const {sendEmail} = require('../utils/index');
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



















/*

// @route POST api/auth/register
// @desc Register user
// @access Public
exports.register = async (req, res) => {
    try {
        const { userName } = req.body;

        // Make sure this account doesn't already exist
        const user = await User.findOne({ userName });

        if (user) return res.status(401).json({message: 'The username you have entered is already associated with another account.'});

        const newUser = new User({ ...req.body, role: "basic" });

        const user_ = await newUser.save();

        //await sendVerificationEmail(user_, req, res);

    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
};

// @route POST api/auth/login
// @desc Login user and return JWT token
// @access Public
exports.login = async (req, res) => {
    try {
        const { userName, password } = req.body;

        const user = await User.findOne({ userName });

        if (!user) return res.status(401).json({msg: 'The username ' + userName + ' is not associated with any account. Double-check your userName and try again.'});

        //validate password
        if (!user.comparePassword(password)) return res.status(401).json({message: 'Invalid email or password'});

        // Make sure the user has been verified
        if (!user.isVerified) return res.status(401).json({ type: 'not-verified', message: 'Your account has not been verified.' });

        // Login successful, write token, and send back user
        res.status(200).json({token: user.generateJWT(), user: user});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};


// ===EMAIL VERIFICATION
// @route GET api/verify/:token
// @desc Verify token
// @access Public
exports.verify = async (req, res) => {
    if(!req.params.token) return res.status(400).json({message: "We were unable to find a user for this token."});

    try {
        // Find a matching token
        const token = await Token.findOne({ token: req.params.token });

        if (!token) return res.status(400).json({ message: 'We were unable to find a valid token. Your token my have expired.' });

        // If we found a token, find a matching user
        User.findOne({ _id: token.userId }, (err, user) => {
            if (!user) return res.status(400).json({ message: 'We were unable to find a user for this token.' });

            if (user.isVerified) return res.status(400).json({ message: 'This user has already been verified.' });

            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) return res.status(500).json({message:err.message});

                res.status(200).send("The account has been verified. Please log in.");
            });
        });
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

// @route POST api/resend
// @desc Resend Verification Token
// @access Public
exports.resendToken = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) return res.status(401).json({ message: 'The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.'});

        if (user.isVerified) return res.status(400).json({ message: 'This account has already been verified. Please log in.'});

        await sendVerificationEmail(user, req, res);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

async function sendVerificationEmail(user, req, res){
    try{
        const token = user.generateVerificationToken();

        // Save the verification token
        await token.save();

        let subject = "Account Verification Token";
        let to = user.email;
        let from = process.env.FROM_EMAIL;
        let link="http://"+req.headers.host+"/api/auth/verify/"+token.token;
        let html = `<p>Hi ${user.username}<p><br><p>Please click on the following <a href="${link}">link</a> to verify your account.</p>
                  <br><p>If you did not request this, please ignore this email.</p>`;

        await sendEmail({to, from, subject, html});

        res.status(200).json({message: 'A verification email has been sent to ' + user.email + '.'});
    }catch (error) {
        res.status(500).json({message: error.message})
    }
}
*/
