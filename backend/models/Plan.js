//
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Plan", PlanSchema, "Plan");
