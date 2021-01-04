//
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const Plan = require('./Plan')
const Task = require('./Task')


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

UserSchema.methods.saveUser = function (userData, res, userName, secret) {
    const user = this;
    return new Promise((resolve, reject) => {
        user.save((err, user) => {
            if (err) {
                reject(retErr(res, err, 418, 'DB_ERROR'));
            }
            const token = jwt.sign({userName: userName}, secret,
                {
                    expiresIn: 86400,
                });
            const userToReturn = {user: user, token: token};
            userToReturn.user.password = undefined;
          //  return res.status(200).json({success: true, data: userToReturn});
            resolve({success: true, data: userToReturn})
        })
    })
}

UserSchema.methods.delUser = function (planToDelete) {

    const msgSender = this.userName;
    return new Promise((resolve, reject) => {

        Plan.deleteOne({owner: msgSender}, (err, data) => {
            if (err) return retErr(res, {}, 418, 'DB_ERROR');
            // if plans have been deleted, also delete tasks
            if (data.n > 0) {
                Task.deleteMany({plan: planToDelete._id}, (err) => {
                })
                this.updateMany({plan: planToDelete._id}, {$set: {plan: null}}, (err, data) => {
                    if (err)  reject(retErr(res, {}, 418, 'DB_ERROR'));
                })
            }
            //if user is in an existing plan but not owner, remove him/her from plan
            else if (data.n === 0 && this.plan != null) {
                Plan.updateOne({_id: this.plan}, {$pull: {users: {userName: msgSender}}}, (err, data) => {
                    if (err)  reject(retErr(res, {}, 418, 'DB_ERROR'));
                })
            }
        }).then(() => {
            this.deleteOne({userName: msgSender}, (err, data) => {
                if (err)  reject(retErr(res, {}, 418, 'DB_ERROR'));
                resolve({success: true, data: data});
            })
        })
    })
}

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("User", UserSchema);
