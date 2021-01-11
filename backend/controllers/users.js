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



exports.create = async function (req, res) {
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

    let userToSave = new User(userData);

    userToSave.saveUser(userData, res, userName, secret).then((resolve, rej)=>{
        if (resolve){
            return res.status(200).json(resolve);
        }
        else {
            return (rej)
        }
    })
}

exports.delete = async (req, res) => {
    let msgSender = req.user.userName;
    let planToDelete = await Plan.findOne({owner: msgSender})
    let userModel = await User.findOne({userName: msgSender}, (err, data)=>{})

    userModel.delUser(planToDelete).then((resolve, rej) => {
        if (resolve){
            if (planToDelete) planToDelete.delete(res).then((resolve, rej) => {
                if (rej) return(rej);
                // delete Tasks Task.deleteMany({plan: planToDelete._id}, (err) => {
                //                 })
                // update Users
                User.find({plan: planToDelete._id}, (err, userArray) => {
                    for (let u in userArray) {
                        u.removePlan().then((resolve, reject)=>{
                            if(reject) return(reject);
                        });
                    }
                })
                return res.status(200).json(resolve);
            })
            else {
                return res.status(200).json(resolve);
            }
        }
        else {
            return (rej)
        }
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

