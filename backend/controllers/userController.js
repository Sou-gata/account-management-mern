const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const addUser = async (req, res) => {
    let { name, age, mobile, address, id } = req.body;

    if (name === "" || age === "" || mobile === "" || address === "") {
        res.json({
            error: true,
            message: "All fields are required",
        });
        return;
    } else if (mobile.length !== 10) {
        res.json({
            error: true,
            message: "Mobile number must have 10 digits",
        });
        return;
    }
    name = name
        .trim()
        .split(" ")
        .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");

    const user = new User({
        name,
        age,
        mobile,
        address,
        createdBy: id,
    });

    try {
        const newUser = await user.save();
        res.json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

const allUsers = async (req, res) => {
    try {
        const users = await User.find()
            .populate("createdBy")
            .populate("updatedBy")
            .sort({ isActive: -1 });
        res.json(users);
    } catch (error) {
        res.json({ message: error.message });
    }
};

const allActiveUsers = async (req, res) => {
    try {
        const users = await User.find({ isActive: true }).sort({ name: 1 });
        // const users = await User.find({
        //     $and: [{ isActive: true }, { isAdmin: { $ne: true } }],
        // }).sort({ name: 1 });  // To exclude admin
        res.json(users);
    } catch (error) {
        res.json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id);
        if (user) {
            res.json({ message: "User deleted", ...user });
        } else {
            res.json({ error: true, message: "User not found" });
        }
    } catch (error) {
        res.json({ error: true, message: error.message });
    }
};

const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id)
            .populate("createdBy")
            .populate("updatedBy")
            .select("+isAdmin");
        if (user) {
            res.json(user);
        } else {
            res.json({ error: true, message: "User not found" });
        }
    } catch (error) {
        res.json({ error: true, message: error.message });
    }
};

const updateUser = async (req, res) => {
    const id = req.params.id;
    const { name, age, mobile, address, isActive, uid, isAdmin } = req.body;
    try {
        const user = await User.findById(id);
        if (user) {
            user.name = name || user.name;
            user.age = age || user.age;
            user.mobile = mobile || user.mobile;
            user.address = address || user.address;
            user.isActive = isActive;
            user.updatedBy = uid;
            user.isAdmin = isAdmin || user.isAdmin;
            const updatedUser = await user.save();
            res.json(updatedUser);
        } else {
            res.json({ error: true, message: "User not found" });
        }
    } catch (error) {
        res.json({ error: true, message: error.message });
    }
};

const login = async (req, res) => {
    const { mobile, password } = req.body;
    try {
        let user = await User.findOne({ mobile: mobile })
            .select("+password")
            .select("+isAdmin");
        if (user) {
            const matched = bcrypt.compareSync(password, user.password);
            if (matched) {
                const token = jwt.sign(
                    {
                        id: user._id,
                        admin: user.isAdmin,
                        name: user.name,
                        mobile: user.mobile,
                    },
                    process.env.JWT_SECRET
                );
                res.json({
                    token,
                    id: user._id,
                    admin: user.isAdmin,
                    name: user.name,
                    mobile: user.mobile,
                });
            } else {
                res.json({ error: true, message: "Invalid credentials" });
            }
        } else {
            res.json({ error: true, message: "Invalid credentials" });
        }
    } catch (error) {
        res.json({ error: true, message: error.message });
    }
};

const verifyToken = async (req, res) => {
    const { token } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.mobile) {
            let user = await User.findOne({ mobile: decoded.mobile }).select(
                "+isAdmin"
            );
            if (user) {
                res.json({
                    id: user._id,
                    admin: user.isAdmin,
                    name: user.name,
                    mobile: user.mobile,
                    createdBy: user.createdBy,
                    updatedBy: user.updatedBy,
                    token,
                });
            } else {
                res.json({ error: true, message: "Invalid token" });
            }
        } else {
            res.json({ error: true, message: "Invalid token" });
        }
    } catch (error) {
        res.json({ error: true, message: error.message });
    }
};

const changePassWord = async (req, res) => {
    const { id, currentPassword, newPassword } = req.body;
    try {
        let user = await User.findOne({ _id: id }).select("+password");
        if (user) {
            const matched = bcrypt.compareSync(currentPassword, user.password);
            if (matched) {
                const hash = bcrypt.hashSync(newPassword, 10);
                user.password = hash;
                const updatedUser = await user.save();
                res.json(updatedUser);
            } else {
                res.json({ error: true, message: "Invalid password" });
            }
        } else {
            res.json({ error: true, message: "Invalid user" });
        }
    } catch (error) {}
};

const verifyPassword = async (req, res) => {
    const { id, password } = req.body;
    try {
        const user = await User.findById(id).select("+password");
        if (user) {
            const matched = bcrypt.compareSync(password, user.password);
            if (matched) {
                res.json({ error: false, message: "Password matched" });
            } else {
                res.json({ error: true, message: "Password not matched" });
            }
        } else {
            res.json({ error: true, message: "Invalid user" });
        }
    } catch (error) {
        res.json({ error: true, message: error.message });
    }
};

module.exports = {
    addUser,
    allUsers,
    deleteUser,
    getUser,
    updateUser,
    allActiveUsers,
    login,
    verifyToken,
    changePassWord,
    verifyPassword,
};
