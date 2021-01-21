const Plan = require("../models/Plan");
const Tasks = require("../models/Task");
const mongoose = require("mongoose");
const User = require("../models/User");
const { retErr } = require("../utils");
const ObjectId = mongoose.Types.ObjectId;
const { checkInputs } = require("../utils/index");

exports.showMany = (req, res) => {
  Tasks.find((err, data) => {
    if (err) {
      return res.json({ success: false, error: err });
    } else {
      return res.json({ success: true, data: data });
    }
  });
};

exports.create = async (req, res) => {
  if (checkInputs(req, res)) return retErr(res, {}, 418, "INVALID_INPUT");

  let task = new Tasks();
  const { name, pointsWorth } = req.body;
  let msgSender = req.user.userName;

  let user = await User.findOne({ userName: msgSender });
  if (user.plan === null) return retErr(res, {}, 418, "USER_NOT_IN_ANY_PLAN");

  planId = user.plan;
  let plan = await Plan.findOne({ _id: planId }, (err, plan) => {
    if (err) return retErr(res, {}, 418, "DB_ERROR");
  });
  //checks if plan with planId exists
  Plan.exists({ _id: planId }, (err, exists) => {
    task.name = name;
    task.lastTimeDone = Date.now();
    task.plan = planId;
    task.pointsWorth = pointsWorth;

    task.create(res).then((resolve, reject) => {
      if (reject) return reject;
      if (resolve) {
        plan.addTask(res, resolve.data).then((resolve, reject) => {
          if (reject) return reject;
          if (resolve) {
            return res.status(200).json({ data: true, resolve });
          }
        });
      }
    });
  });
};

exports.destroy = async (req, res) => {
  if (checkInputs(req, res)) return retErr(res, {}, 418, "INVALID_INPUT");
  let msgSender = req.user.userName;
  let taskId = req.body.taskId;

  //eigentlich unnoetige abfrage
  let user = await User.findOne({ userName: msgSender });
  if (user.plan === null) return retErr(res, {}, 418, "USER_NOT_IN_ANY_PLAN");
  planId = user.plan;

  let task = await Task.findOne({ _id: taskId }, (err, task) => {});
  if (!task) return retErr(res, {}, 418, "TASK_NOT_FOUND");

  let plan = await Plan.findOne({ _id: task.plan }, (err, plan) => {});
  if (!plan.users.some((e) => e.userName === msgSender))
    return retErr(res, {}, 418, "USER_NOT_IN_THIS_PLAN");

  task.delete(res).then((resolve, reject) => {
    if (reject) return reject;
    if (resolve) {
      plan.removeTask(res, task).then((resolve, reject) => {
        if (reject) return reject;
        if (resolve) {
          return res.status(200).json(resolve);
        }
      });
    }
  });
};
