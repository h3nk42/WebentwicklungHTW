//
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TaskSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        lastTimeDone: {
            type: Number,
            required: true
        },
        plan: {
            type: mongoose.ObjectId,
            required: true
        },
        pointsWorth: {
            type: Number,
            required: true,
            default: 10,
        }
    },
    { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Task", TaskSchema);
