const Plan = require("../models/Plan");
const Task = require("../models/Task");
const User = require("../models/User");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const { retErr } = require("../utils/index");
const { checkInputs } = require("../utils/index");

const { removePlanFromUsers } = require("./util");

exports.showOne = async (req, res) => {
  let msgSender = req.user.userName;
  let user = await User.findOne({ userName: msgSender }, (err, data) => {});
  Plan.findOne({ _id: user.plan }, (err, data) => {
    if (!data) return retErr(res, err, 418, "USER_NOT_IN_ANY_PLAN");
    if (err) {
      return retErr(res, err, 418, "DB_ERROR");
    } else {
      return res.status(200).json({ data: data });
    }
  });
};

exports.showMany = (req, res) => {
  Plan.find((err, data) => {
    if (err) {
      return retErr(res, err, 418, "PLAN_NOT_FOUND");
    } else {
      return res.status(200).json({ data: data });
    }
  });
};

exports.create = async (req, res) => {
  if (checkInputs(req, res)) return retErr(res, {}, 418, "INVALID_INPUT");
  let msgSender = req.user.userName;
  let plan = new Plan();
  const { name } = req.body;
  //check if user already has a plan
  let planExists = await Plan.exists({ owner: msgSender });
  if (planExists) return retErr(res, {}, 418, "ONLY_ONE_PLAN_PER_USER");

  let user = await User.findOne({ userName: msgSender }, (err, user) => {
    if (err) return retErr(res, {}, 418, "DB_ERROR");
  });

  plan.name = name;
  plan.users = [{ userName: msgSender, points: 0 }];
  plan.owner = msgSender;
  plan.tasks = [];
  plan.create(res).then((resolve, reject) => {
    if (reject) return reject;
    if (resolve) {
      user.setPlan(resolve.data._id, res).then((resolve, reject) => {
        if (reject) return reject;
        else return res.json({ success: true, data: plan });
      });
    }
  });
};

exports.destroy = async (req, res) => {
  if (checkInputs(req, res)) return retErr(res, {}, 418, "INVALID_INPUT");
  const msgSender = req.user.userName;
  let plan = await Plan.findOne({ owner: msgSender }, (err, plan) => {
    if (err) return retErr(res, {}, 418, "DB_ERROR");
  });
  if (!plan) return retErr(res, {}, 418, "USER_NOT_IN_ANY_PLAN");
  if (plan.owner !== req.user.userName)
    return retErr(res, {}, 418, "USER_NOT_OWNER_OF_PLAN");
  if (!plan) return retErr(res, {}, 418, "USER_NOT_IN_ANY_PLAN");
  if (plan.owner !== req.user.userName)
    return retErr(res, {}, 418, "USER_NOT_OWNER_OF_PLAN");

  plan.delete(res).then(async (resolve, reject) => {
    if (reject) return reject;
    if (resolve) {
      let tasks = await Task.find(
        { plan: plan._id.toString() },
        (err, tasks) => {
          if (err) return retErr(res, {}, 418, "DB_ERROR");
        }
      );

      for (let task of tasks) {
        task.delete(res).then((resolve, reject) => {
          if (reject) return reject;
        });
      }
      User.find({ plan: ObjectId(plan.id) }, (err, users) => {
        removePlanFromUsers(users).then((resolve, reject) => {
          if (reject) return reject;
          if (resolve) {
            return res.json({ data: true });
          }
        });
      });
    }
  });
};

exports.addUser = async (req, res) => {
  if (checkInputs(req, res)) return retErr(res, {}, 418, "INVALID_INPUT");
  let msgSender = req.user.userName,
    userToAdd = req.body.userName;
  let plan = await Plan.findOne({ owner: req.user.userName }, (err, plan) => {
    if (err) return retErr(res, err, 418, "DB_ERROR");
  });
  if (!plan) return retErr(res, {}, 418, "PLAN_NOT_FOUND");
  if (plan.users.some((e) => e.userName === userToAdd))
    return retErr(res, {}, 418, "USER_IN_PLAN_ALLREADY");
  let user = await User.findOne({ userName: userToAdd }, (err) => {});
  if (!user) return retErr(res, {}, 418, "USER_DOES_NOT_EXIST");
  if (user.plan != null) return retErr(res, {}, 418, "USER_IN_ANOTHER_PLAN");

  plan.addUser(res, userToAdd).then((resolve, reject) => {
    if (reject) return reject;
    if (resolve) {
      const newPlan = resolve.plan;
      user.setPlan(plan.id, res).then((resolve, reject) => {
        if (reject) return reject;
        if (resolve) {
          return res.status(200).json({ success: true, data: newPlan });
        }
      });
    }
  });
};

exports.removeUser = async (req, res) => {
  const doAction = () => {
    plan.removeUser(res, userToRemove).then((resolve, reject) => {
      if (reject) return reject;
      if (resolve) {
        const updatedPlan = resolve;
        userUserToRemove.removePlan().then((resolve, rej) => {
          if (rej) return rej;
          if (resolve)
            return res.status(200).json({ data: true, plan: updatedPlan });
        });
      }
    });
  };

  if (checkInputs(req, res)) return retErr(res, {}, 418, "INVALID_INPUT");
  let msgSender = req.user.userName,
    userToRemove = req.body.userName;
  let userMsgSender = await User.findOne({ userName: msgSender }, (err) => {});
  let userUserToRemove = await User.findOne(
    { userName: userToRemove },
    (err) => {}
  );
  if (!userMsgSender.plan) return retErr(res, {}, 418, "USER_NOT_IN_ANY_PLAN");
  let plan = await Plan.findOne(
    { _id: ObjectId(userMsgSender.plan) },
    (err, plan) => {
      if (err) return retErr(res, err, 418, "DB_ERROR");
    }
  );
  if (!plan) return retErr(res, {}, 418, "PLAN_NOT_FOUND");
  if (msgSender === userToRemove && plan.owner !== msgSender) doAction();
  else {
    if (plan.owner !== msgSender)
      return retErr(res, {}, 418, "USER_NOT_OWNER_OF_PLAN");
    if (msgSender === userToRemove)
      return retErr(res, {}, 418, "OWNER_CANT_REMOVE_HIMSELF");
    let user = await User.findOne({ userName: userToRemove }, (err) => {});
    if (!user) return retErr(res, {}, 418, "USER_DOES_NOT_EXIST");
    console.log(String(userMsgSender.plan));
    console.log(String(user.plan));
    if (String(user.plan) !== String(userMsgSender.plan))
      return retErr(res, {}, 418, "USER_NOT_IN_THIS_PLAN");
    doAction();
  }
};
