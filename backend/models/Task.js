//
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastTimeDone: {
      type: Number,
      required: true,
    },
    plan: {
      type: mongoose.ObjectId,
      required: true,
    },
    pointsWorth: {
      type: Number,
      required: true,
      default: 10,
    },
  },
  { timestamps: true }
);

TaskSchema.methods.create = function (res) {
  const task = this;
  return new Promise((resolve, reject) => {
    task.save((err, user) => {
      if (err) {
        reject(retErr(res, err, 418, "DB_ERROR"));
      }
      resolve({ success: true, data: task });
    });
  });
};

TaskSchema.methods.delete = function (res) {
  const task = this;
  return new Promise((resolve, reject) => {
    task.deleteOne({ _id: this._id }, (err, data) => {
      if (err) reject(retErr(res, {}, 418, "DB_ERROR"));
      resolve({ success: true, data: data });
    });
  });
};

TaskSchema.methods.updateLastTimeDone = function (res) {
  const task = this;
  return new Promise((resolve, reject) => {
    task.lastTimeDone = Date.now();
    task.save((err, user) => {
      if (err) {
        reject(retErr(res, err, 418, "DB_ERROR"));
      }
      resolve({ success: true, data: task });
    });
  });
};

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Task", TaskSchema);
