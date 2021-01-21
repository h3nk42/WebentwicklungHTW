const User = require("../models/User");
const Plan = require("../models/Plan");
const Task = require("../models/Task");
const { uploader, sendEmail } = require("../utils/index");
const { validationResult } = require("express-validator");
const ObjectId = require("mongoose").Types.ObjectId;
const { retErr } = require("../utils/index");
const { checkInputs } = require("../utils/index");
const { removePlanFromUsers } = require("./util");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.JWT_SECRET;

exports.create = async function (req, res) {
  if (checkInputs(req, res)) return retErr(res, {}, 418, "INVALID_INPUT");
  let { userName, password } = req.body;
  let user = await User.exists({
    $or: [
      { userName: userName },
      { userNameLowerCase: userName.toLowerCase() },
    ],
  });
  if (user) {
    return retErr(res, {}, 418, "USERNAME_TAKEN");
  }
  const userData = {
    userName: userName,
    userNameLowerCase: userName.toLowerCase(),
    password: password,
  };

  let userToSave = new User(userData);

  userToSave.saveUser(userData, res, userName, secret).then((resolve, rej) => {
    if (resolve) {
      return res.status(200).json(resolve);
    } else {
      return rej;
    }
  });
};

exports.delete = async (req, res) => {
  let msgSender = req.user.userName;
  let planToDelete = await Plan.findOne({ owner: msgSender });
  let userModel = await User.findOne(
    { userName: msgSender },
    (err, data) => {}
  );

  userModel.destroy(res, planToDelete).then((resolve, rej) => {
    if (resolve) {
      if (planToDelete)
        planToDelete.delete(res).then(async (resolve, rej) => {
          if (rej) return rej;

          let tasks = await Task.find(
            { plan: planToDelete._id.toString() },
            (err, tasks) => {
              if (err) return retErr(res, {}, 418, "DB_ERROR");
            }
          );

          for (let task of tasks) {
            task.delete(res).then((resolve, reject) => {
              if (reject) return reject;
            });
          }
          User.find({ plan: planToDelete._id }, (err, users) => {
            removePlanFromUsers(users).then((resolve, reject) => {
              if (reject) return reject;
              if (resolve) return res.json({ data: true });
            });
          });
        });
      else {
        return res.status(200).json(resolve);
      }
    } else {
      return rej;
    }
  });
};

exports.showMany = async function (req, res) {
  User.find({}, (err, data) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      data: data,
    });
  });
};

exports.updateData = async (req, res) => {
  let msgSender = req.user.userName;
  let { firstName, surName, dateOfBirth } = req.body;

  console.log(firstName + surName + dateOfBirth);

  let user = await User.findOne({ userName: msgSender }, (err, data) => {});

  user
    .updateData(res, { firstName, surName, dateOfBirth })
    .then((resolve, reject) => {
      if (reject) return resolve;
      if (resolve) {
        return res.status(200).json(resolve);
      }
    });
};
