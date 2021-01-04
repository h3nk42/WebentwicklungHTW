const User = require('../models/User');
const Plan = require('../models/Plan');
const Task = require('../models/Task')
const {uploader, sendEmail} = require('../utils/index');
const {validationResult} = require('express-validator');
const ObjectId = require('mongoose').Types.ObjectId
const {retErr} = require('../utils/index');
const {checkInputs} = require('../utils/index')

const jwt = require('jsonwebtoken')
require('dotenv').config();

const secret = process.env.JWT_SECRET;



exports.createUser = async function (req, res) {
    if(checkInputs(req,res)) return  retErr(res, {}, 418, 'INVALID_INPUT');
    let{ userName, password } = req.body;
    let user = await User.exists({$or:[{userName: userName},{userNameLowerCase: userName.toLowerCase()}]})
    if (user){
        return  retErr(res, {}, 418, 'USERNAME_TAKEN');
    }
    const userData = {
        userName: userName,
        userNameLowerCase: userName.toLowerCase(),
        password: password
    }
    User(userData).save((err, user)=>{
        if(err){
            return  retErr(res, err, 418, 'DB_ERROR');
        }
        const token = jwt.sign({userName: userName}, secret,
            {
                expiresIn: 86400,
            });
        const userToReturn = {user: user, token: token};
        console.log(user)
        console.log(token)
        userToReturn.user.password = undefined;
        return res.status(200).json({success: true, data: userToReturn});
    })
}

exports.delAllUsers = async (req, res) => {
    let users = await User.find({}, (err, data) =>{
    })
    let userNames = users.map((user)=> user.userName)
    Plan.deleteMany({owner:{$in: userNames}}).then(()=>{
        User.deleteMany({userName: {$in: userNames}}, (err, data) =>{
            return res.status(200).json({success:true, data: data})
        })
    })
}

exports.delUser = async (req, res) => {
    let msgSender = req.user.userName;
    let planToDelete = await Plan.findOne({owner: msgSender})
    let userModel = await User.findOne({userName: msgSender}, (err, data)=>{})

    Plan.deleteOne({owner: msgSender}, (err,data) =>{
        if (err)  return  retErr(res, {}, 418, 'DB_ERROR');
        // if plans have been deleted, also delete tasks
        if(data.n>0){
            Task.deleteMany({plan: planToDelete._id}, (err) => {})
            User.updateMany({plan: planToDelete._id}, {$set: {plan: null}}, (err, data) =>{
                if (err)  return  retErr(res, {}, 418, 'DB_ERROR');
            })
        }
        //if user is in an existing plan but not owner, remove him/her from plan
        else if(data.n===0 && userModel.plan != null) {
            Plan.updateOne({_id: userModel.plan}, {$pull: {users: {userName: msgSender}}}, (err,data) =>{
                if (err)  return  retErr(res, {}, 418, 'DB_ERROR');
            })
        }
    }).then(()=>{
        User.deleteOne({userName: req.user.userName}, (err, data) =>{
            if (err)  return  retErr(res, {}, 418, 'DB_ERROR');
            return res.status(200).json({success:true, data: data})
        })
    })
}


exports.findAllUsers = async function (req, res) {
    User.find({},(err, data)=>{
        if(err){
            return res.status(400).json({
                success: false,
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            data: data
        })
    })
}

