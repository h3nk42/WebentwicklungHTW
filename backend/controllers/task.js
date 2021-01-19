const Plan = require("../models/Plan");
const Task = require("../models/Task");
const mongoose = require("mongoose");
const User = require("../models/User");
const ObjectId = mongoose.Types.ObjectId;

exports.showMany = (req, res) => {
  Task.find((err, data) => {
    if (err) {
      return res.json({ success: false, error: err });
    } else {
      return res.json({ success: true, data: data.length });
    }
  });
};

exports.create = async (req, res) => {
  if (checkInputs(req, res)) return retErr(res, {}, 418, "INVALID_INPUT");

  let task = new Task();
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
    task.save((err, newtask) => {
      if (err) return retErr(res, {}, 418, "DB_ERROR");
      Plan.updateOne(
        { _id: planId },
        {
          $push: {
            tasks: [
              {
                taskName: name,
                taskId: newtask._id,
                pointsWorth: pointsWorth,
                lastTimeDone: Date.now(),
              },
            ],
          },
        },
        (err, updatedPlan) => {
          if (err) return retErr(res, {}, 418, "DB_ERROR");
        }
      );
      return res.json({ data: true });
    });
  });
};
