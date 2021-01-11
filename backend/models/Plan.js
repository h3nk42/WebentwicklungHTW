//
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const {retErr} = require('../utils/index');

const PlanSchema = new Schema(
    {
        users: [],
        tasks: [],
        owner: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

PlanSchema.methods.delete = function (res) {
    const plan = this;
    return new Promise((resolve, reject) => {
        plan.deleteOne({_id: this._id}, (err, data) => {
            if (err) reject(retErr(res, {}, 418, 'DB_ERROR'));
            resolve({success: true, data: data});
        })
    })
}

PlanSchema.methods.create = function (res) {
    const plan = this;
    return new Promise((resolve, reject) => {
        plan.save({_id: this._id}, (err, plan) => {
            if (err) reject(retErr(res, {}, 418, 'DB_ERROR'));
            resolve({success: true, data: plan});
        })
    })
}

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Plan", PlanSchema, "Plan");
