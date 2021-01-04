//
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const Schema = mongoose.Schema;
const Token = require('./unused/Token');

const UserSchema = new Schema(
    {
        userName: {
            type: String,
            //required: true,
            trim: true,
            unique: true
        },
        userNameLowerCase: {
            type: String,
            //required: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            //required: true,
            trim: true
        },
        plan: {
            type: mongoose.ObjectId,
            required: false,
            trim: true,
            default: null
        },
        resetPasswordToken: {
            type: String,
            required: false
        },
        isVerified: {
            type: Boolean,
            default: true
        },

        resetPasswordExpires: {
            type: Date,
            required: false
        }
    },
    { timestamps: true }
)

UserSchema.pre('save',  function(next) {
    const user = this;
    if (!user.isModified('password')) return next();
       bcrypt.hash(user.password, 10,function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
});

//check if password matches to db password
UserSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compareSync(password, this.password);
};


UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    let payload = {
        id: this._id,
        email: this.email,
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
    });
};

UserSchema.methods.generatePasswordReset = function() {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

UserSchema.methods.generateVerificationToken = function() {
    let payload = {
        userId: this._id,
        token: crypto.randomBytes(20).toString('hex')
    };

    return new Token(payload);
};


// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("User", UserSchema);
