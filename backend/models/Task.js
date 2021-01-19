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
    task.save({ _id: this._id }, (err, task) => {
      if (err) reject(retErr(res, {}, 418, "DB_ERROR"));
      resolve({ success: true, data: task });
    });
  });
};

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Task", TaskSchema);
