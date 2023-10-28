const mongoose = require("mongoose");

const fuelSchema = new mongoose.Schema(
    {
        date: { type: Date, required: true, default: new Date() },
        users: [
            {
                name: { type: String, required: true },
                userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                start: { type: Number, default: 0, required: true },
                end: { type: Number, default: 0, required: true },
            },
        ],
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Fuel", fuelSchema);
