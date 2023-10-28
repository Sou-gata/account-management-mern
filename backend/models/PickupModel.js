const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        date: { type: Date, required: true, default: new Date() },
        users: [
            {
                name: { type: String, required: true },
                ofd: { type: Number, required: true },
                ofp: { type: Number, required: true },
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: "User",
                },
                pickup: { type: Number, default: 0 },
                cost: { type: Number, default: 0 },
                cash: { type: Number, default: 0 },
                delivered: { type: Number, default: 0 },
                online: { type: Number, default: 0 },
            },
        ],
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Pickup", userSchema);
