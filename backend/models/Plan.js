const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { retErr } = require("../utils/index");

const PlanSchema = new Schema(
  {
    users: [],
    tasks: [],
    owner: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

PlanSchema.methods.delete = function (res) {
  const plan = this;
  return new Promise((resolve, reject) => {
    plan.deleteOne({ _id: this._id }, (err, data) => {
      if (err) reject(retErr(res, {}, 418, "DB_ERROR"));
      resolve({ success: true, data: data });
    });
  });
};

PlanSchema.methods.create = function (res) {
  const plan = this;
  return new Promise((resolve, reject) => {
    plan.save({ _id: this._id }, (err, plan) => {
      if (err) reject(retErr(res, {}, 418, "DB_ERROR"));
      resolve({ success: true, data: plan });
    });
  });
};

PlanSchema.methods.addUser = function (res, userToAdd) {
  return new Promise((resolve, reject) => {
    this.users.push({ userName: userToAdd, points: 0 });
    this.save((err, plan) => {
      if (err) reject(retErr(res, {}, 418, "DB_ERROR"));
      else {
        resolve({ success: true, plan: plan });
      }
    });
  });
};

PlanSchema.methods.removeUser = function (res, userToRemove) {
  return new Promise((resolve, reject) => {
    this.users = this.users.filter((user, index, arr) => {
      return user.userName !== userToRemove;
    });
    this.save((err, plan) => {
      if (err) reject(retErr(res, {}, 418, "DB_ERROR"));
      else {
        resolve({ success: true, plan: plan });
      }
    });
  });
};

PlanSchema.methods.addTask = function (res, taskToAdd) {
  return new Promise((resolve, reject) => {
    this.tasks.push(taskToAdd);
    this.save((err, plan) => {
      if (err) reject(retErr(res, {}, 418, "DB_ERROR"));
      if (plan) resolve({ success: true, plan: plan });
    });
  });
};

PlanSchema.methods.removeTask = function (res, taskToRemove) {
  return new Promise((resolve, reject) => {
    this.tasks = this.tasks.filter((task, index, arr) => {
      return task._id.toString() !== taskToRemove._id.toString();
    });
    this.save((err, plan) => {
      if (err) reject(retErr(res, {}, 418, "DB_ERROR"));
      if (plan) resolve({ success: true, plan: plan });
    });
  });
};

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Plan", PlanSchema, "Plan");
