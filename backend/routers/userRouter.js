const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/userController");
const { isAdmin } = require("../middleware/authMiddleware");

router.post("/add", isAdmin, addUser);
router.get("/all", allUsers);
router.get("/active", allActiveUsers);
router.delete("/delete/:id", isAdmin, deleteUser);
router.get("/get/:id", getUser);
router.put("/update/:id", isAdmin, updateUser);
router.post("/login", login);
router.post("/verify", verifyToken);
router.post("/change-password", changePassWord);
router.post("/verify-password", verifyPassword);

module.exports = router;
