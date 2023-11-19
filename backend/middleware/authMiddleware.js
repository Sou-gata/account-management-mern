const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const isAdmin = async (req, res, next) => {
    let token;
    if (req?.headers?.authorization?.startsWith("Bearer")) {
        token = req?.headers?.authorization.split(" ")[1];
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(decoded?.id).select("+isAdmin");
                req.user = user;
                const { isAdmin } = user;
                if (!isAdmin) {
                    res.json({
                        error: true,
                        message: "You are not authorized to access this route",
                    });
                    return;
                } else {
                    next();
                }
            } catch (error) {
                return res.json({
                    error: true,
                    message: "Not authorized or token expires, Please login again",
                });
            }
        }
    } else {
        return res.json({ error: true, message: "There is no token attached to header" });
    }
};

module.exports = { isAdmin };
