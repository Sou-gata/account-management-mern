const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        age: { type: Number, required: true },
        mobile: { type: Number, required: true, unique: true },
        address: { type: String, required: true },
        isActive: { type: Boolean, default: true },
        isAdmin: { type: Boolean, default: false, select: false },
        password: {
            type: String,
            required: false,
            default: "$2b$10$phVXWREpUdpP/YTwesIxNujwmoxHAAmVGvFHc5eNLR43Mv34qS3a.", //12345678
            select: false,
        },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
