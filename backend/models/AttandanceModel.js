const mongoose = require("mongoose");
// const { dateToString } = require("../utils");

const attandanceSchema = new mongoose.Schema(
    {
        date: { type: Date, default: Date.now() },
        users: [
            {
                name: { type: String, required: true },
                userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            },
        ],
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Attandance", attandanceSchema);
