

const {validationResult} = require('express-validator');



const passwordValidator = require('password-validator')

let password = new passwordValidator();

password
    .is().min(5)                                    // Minimum length 8
    .is().max(20)                                  // Maximum length 100     // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']);

module.exports.passwordScheme = password;


exports.generateServerErrorCode = (res, code, fullError, msg, location = 'server') => {
    return {
        success: false,
        fullError: fullError,
        msg: msg,
        location: location
    }
}

exports.retErr = (res, err, errCode = 400, customMessage) => {
    console.log(customMessage)
    return res.status(errCode).json({ errors: err, customMessage});
}

exports.checkInputs = (req, res) => {
    return !validationResult(req).isEmpty();
}

/*
const Datauri = require('datauri');
const path = require('path');


const cloudinary = require('../config/cloudinary');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function uploader(req) {
    return new Promise((resolve, reject) => {
        const dUri = new Datauri();
        let image = dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
        cloudinary.uploader.upload(image.content, (err, url) => {
            if (err) return reject(err);
            return resolve(url);
        })
    });
}

function sendEmail(mailOptions) {
    return new Promise((resolve, reject) => {
        sgMail.send(mailOptions, (error, result) => {
            if (error) return reject(error);
            return resolve(result);
        });
    });
}

module.exports = { uploader, sendEmail };
*/
