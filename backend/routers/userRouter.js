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
} = require("../controllers/userController");

router.post("/add", addUser);
router.get("/all", allUsers);
router.get("/active", allActiveUsers);
router.delete("/delete/:id", deleteUser);
router.get("/get/:id", getUser);
router.put("/update/:id", updateUser);
router.post("/login", login);
router.post("/verify", verifyToken);
router.post("/change-password", changePassWord);

module.exports = router;
