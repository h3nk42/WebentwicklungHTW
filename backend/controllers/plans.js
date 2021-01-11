

const Plan = require('../models/Plan')
const Task = require('../models/Task')
const User = require('../models/User')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const {retErr} = require('../utils/index');
const {checkInputs} = require('../utils/index')


exports.findPlanToOwner = async (req, res) => {
    let msgSender = req.user.userName;
    let user = await User.findOne({userName: msgSender}, (err, data)=>{})
    Plan.findOne( {_id: user.plan } ,(err, data) => {
        if (!data)  return  retErr(res, err, 418, 'USER_NOT_IN_ANY_PLAN');
        if (err) {
            return  retErr(res, err, 418, 'DB_ERROR');
        } else {
            return res.status(200).json({data: data});
        }
    });
}

exports.findAllPlans = (req, res) => {
    Plan.find((err, data) => {
        if (err) {
            return  retErr(res, err, 418, 'PLAN_NOT_FOUND');
        } else {
            return res.status(200).json({data: data});
        }
    });
}

exports.createPlan = async (req, res) => {
    if(checkInputs(req,res)) return  retErr(res, {}, 418, 'INVALID_INPUT');
    let msgSender = req.user.userName;
    let plan = new Plan();
    const {name} = req.body;
    //check if user already has a plan
    let planExists = await Plan.exists({owner: msgSender})
    if (planExists)   return  retErr(res, {}, 418, 'ONLY_ONE_PLAN_PER_USER');

    let user = await User.findOne({userName: msgSender}, (err, user) => {
        if(err) return retErr(res, {}, 418, 'DB_ERROR');
    })

    plan.name = name;
    plan.users = [{userName: msgSender, points: 0}];
    plan.owner = msgSender;
    plan.tasks = [];
    plan.create(res).then((resolve, reject) => {
        if(reject) return reject;
        if(resolve) {
            user.setPlan(resolve.data._id, res).then((resolve, reject) => {
                if (reject) return reject;
                else return res.json({success: true, data: plan});
            })
        }
    })
}





